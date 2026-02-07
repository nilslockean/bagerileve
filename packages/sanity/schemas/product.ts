import {defineField, defineType} from 'sanity'
import {ComponentIcon} from '@sanity/icons'
import {BasketIcon} from '@sanity/icons'
import {TagIcon} from '@sanity/icons'

const currenyFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
})

function formatPrice(variants?: {price: number}[]) {
  const prices = variants?.map((v) => v.price || 0) || [0]
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  if (minPrice === maxPrice) {
    return currenyFormatter.format(minPrice)
  }

  return currenyFormatter.formatRange(minPrice, maxPrice)
}

export default defineType({
  name: 'product',
  type: 'document',
  title: 'Produkter',
  icon: BasketIcon,
  preview: {
    select: {
      title: 'title',
      images: 'images',
      variants: 'variants',
      maxQuantityPerOrder: 'maxQuantityPerOrder',
    },
    prepare(selection) {
      let title = selection.title
      if (selection.maxQuantityPerOrder === 0) {
        title += ` (fullbokad)`
      }
      if (selection.maxQuantityPerOrder === null) {
        title += ` (obegränsad)`
      }

      return {
        title: title,
        icon: ComponentIcon,
        subtitle: formatPrice(selection.variants),
        media: selection.images?.[0],
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Länk',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Start variants
    defineField({
      name: 'variants',
      type: 'array',
      title: 'Varianter',
      of: [
        {
          type: 'object',
          title: 'Prisalternativ',
          fields: [
            {
              name: 'description',
              type: 'string',
              title: 'Beskrivning',
              description: 'Visas endast i butiken om produkten har flera prisalternativ',
              initialValue: 'Standard',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              type: 'number',
              title: 'Pris',
              description: 'Ange priset i SEK',
              validation: (Rule) => Rule.positive().required(),
            },
            {
              name: 'id',
              type: 'slug',
              title: 'Variant-ID',
              description: 'Genereras från beskrivningen',
              options: {
                source: (_doc, options) => {
                  // `options.parent` is the current array item
                  return options.parent?.description
                },
                isUnique: (value, context) => {
                  const {parent, document} = context
                  if (!document?.variants) {
                    return true
                  }

                  const duplicates = document.variants.filter(
                    (variant: any) => variant.id?.current === value && variant !== parent,
                  )

                  return duplicates.length === 0
                },
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              description: 'description',
              price: 'price',
            },
            prepare(selection) {
              const formattedPrice = currenyFormatter.format(selection.price || 0)
              const title = selection.description
              const subtitle = formattedPrice

              return {
                title,
                subtitle,
                media: TagIcon,
              }
            },
          },
        },
      ],
    }),
    // End variants

    // Start images
    defineField({
      name: 'images',
      type: 'array',
      title: 'Bilder',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Bild',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt-text',
              description:
                'Alt-text ger en tillgänglig beskrivning för skärmläsare och förbättrar SEO genom att hjälpa sökmotorer förstå bildens innehåll.',
            },
          ],
        },
      ],
    }),
    // End images

    // Start content
    defineField({
      title: 'Produktbeskrivning',
      description: 'Allt innehåll på hemsidan översätts automatiskt till engelska',
      name: 'content',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'link',
                fields: [
                  {
                    name: 'url',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'button',
                type: 'object',
                title: 'button',
                icon: ComponentIcon,
                fields: [
                  {
                    name: 'url',
                    type: 'string',
                  },
                  {
                    name: 'primary',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
        },
      ],
    }),
    // End content

    // Start max quantity per order
    defineField({
      name: 'maxQuantityPerOrder',
      type: 'number',
      title: 'Max antal per beställning',
      description: 'Lämna tomt för obegränsat. Ange 0 om produkten är fullbokad.',
      initialValue: 10,
      validation: (Rule) =>
        Rule.integer().min(0).warning('Använd 0 för fullbokad, tomt för obegränsat'),
    }),
    // End max quantity per order

    // Start pickp date limitation
    defineField({
      name: 'pickupDates',
      title: 'Begränsa datum för upphämtning',
      description:
        'Ange datum som produkten kan hämtas. Om inget datum anges kan produkten hämtas under ordinarie öppettider, med minst två dagars framförhållning.',
      type: 'array',
      of: [
        {
          name: 'date',
          type: 'date',
          title: 'Datum',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
})
