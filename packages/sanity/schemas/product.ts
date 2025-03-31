import {defineField, defineType} from 'sanity'
import {ComponentIcon} from '@sanity/icons'
import {BasketIcon} from '@sanity/icons'
import {EyeClosedIcon} from '@sanity/icons'
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
      prices: 'prices',
      enabled: 'enabled',
    },
    prepare(selection) {
      return {
        title: selection.title,
        icon: ComponentIcon,
        subtitle: formatPrice(selection.prices),
        media: !selection.enabled ? EyeClosedIcon : selection.images?.[0],
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

    // Start prices
    defineField({
      name: 'prices',
      type: 'array',
      title: 'Priser',
      of: [
        {
          type: 'object',
          title: 'Prisalternativ',
          fields: [
            {
              name: 'price',
              type: 'number',
              title: 'Pris',
              description: 'Ange priset i SEK',
              initialValue: 0,
              validation: (Rule) => Rule.positive(),
            },
            {
              name: 'description',
              type: 'string',
              description: 'Frivilligt om endast ett prisalternativ',
              title: 'Beskrivning',
            },
          ],
          preview: {
            select: {
              description: 'description',
              price: 'price',
            },
            prepare(selection) {
              const formattedPrice = currenyFormatter.format(selection.price || 0)
              const title = selection.description || formattedPrice
              const subtitle = selection.description && formattedPrice

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
    // End prices

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

    // Start enabled
    defineField({
      name: 'enabled',
      type: 'boolean',
      title: 'Aktiverad',
      description: 'Visa produkten på hemsidan',
      initialValue: true,
    }),
    // End enabled
  ],
})
