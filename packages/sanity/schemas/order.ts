import {defineType, defineField} from 'sanity'
import {BillIcon} from '@sanity/icons'
import {formatPrice} from '../lib/utils'

export default defineType({
  name: 'order',
  title: 'Beställningar',
  type: 'document',
  icon: BillIcon,

  fields: [
    // Meta--
    defineField({
      name: 'orderNumber',
      title: 'Ordernummer',
      type: 'string',
      readOnly: true,
    }),

    // defineField({
    //   name: 'status',
    //   title: 'Status',
    //   type: 'string',
    //   initialValue: 'pending',
    //   options: {
    //     list: [
    //       { title: 'Pending', value: 'pending' },
    //       { title: 'Confirmed', value: 'confirmed' },
    //       { title: 'Fulfilled', value: 'fulfilled' },
    //       { title: 'Cancelled', value: 'cancelled' },
    //     ],
    //     layout: 'radio',
    //   },
    // }),

    // Customer
    defineField({
      name: 'customer',
      title: 'Kund',
      type: 'object',
      fields: [
        {name: 'name', title: 'Namn', type: 'string'},
        {name: 'email', title: 'E-post', type: 'string'},
        {name: 'phone', title: 'Telefon', type: 'string'},
        {name: 'message', title: 'Meddelande', type: 'text', readOnly: true},
      ],
    }),

    // Pickup
    defineField({
      name: 'pickupDate',
      title: 'Upphämtningsdatum',
      type: 'date',
    }),

    // Items-
    defineField({
      name: 'items',
      title: 'Orderrader',
      type: 'array',
      of: [{type: 'orderItem'}],
      validation: (Rule) => Rule.min(1),
    }),

    // Totals
    defineField({
      name: 'totals',
      title: 'Sammanställning',
      type: 'object',
      readOnly: true,
      fields: [
        // {name: 'subtotal', type: 'number'},
        {name: 'tax', type: 'number', title: 'Moms'},
        {name: 'total', type: 'number', title: 'Totalt'},
      ],
    }),
  ],

  preview: {
    select: {
      orderNumber: 'orderNumber',
      total: 'totals.total',
      name: 'customer.name',
      pickupDate: 'pickupDate',
      // status: 'status',
    },
    prepare({name, orderNumber, total, pickupDate}) {
      return {
        title: `${pickupDate} - ${name}`,
        subtitle: `#${orderNumber} – ${formatPrice([total])}`,
      }
    },
  },
})
