import {defineField, defineType} from 'sanity'
import {formatPrice} from '../lib/utils'

export default defineType({
  name: 'orderItem',
  title: 'Orderrad',
  type: 'object',

  fields: [
    // References (for navigation)
    defineField({
      name: 'product',
      title: 'Produkt',
      type: 'reference',
      to: [{type: 'product'}],
    }),

    // Snapshot data
    defineField({
      name: 'productTitle',
      title: 'Produktnamn',
      description: 'Produktens namn vid köptillfället',
      type: 'string',
      readOnly: true,
    }),

    defineField({
      name: 'variantId',
      title: 'Variant-ID',
      type: 'string',
      description: 'Variantens ID vid köptillfället',
      readOnly: true,
    }),

    defineField({
      name: 'variantDescription',
      title: 'Variant',
      description: 'Variantens beskrivning vid köptillfället',
      type: 'string',
      readOnly: true,
    }),

    defineField({
      name: 'unitPrice',
      title: 'Styckpris',
      type: 'number',
      readOnly: true,
    }),

    defineField({
      name: 'quantity',
      title: 'Antal',
      type: 'number',
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: 'lineTotal',
      title: 'Radtotal',
      type: 'number',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'productTitle',
      variant: 'variantDescription',
      qty: 'quantity',
      total: 'lineTotal',
    },
    prepare({title, variant, qty, total}) {
      return {
        title: `${qty} × ${title}`,
        subtitle: `${variant ?? 'Standard'} – ${formatPrice([total])}`,
      }
    },
  },
})
