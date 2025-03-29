import {defineField, defineType} from 'sanity'
import {ClockIcon, CalendarIcon} from '@sanity/icons'

export default defineType({
  name: 'opening-hours',
  type: 'document',
  title: 'Öppettider',
  icon: ClockIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel*',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'setId',
      type: 'slug',
      title: 'ID*',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hours',
      type: 'array',
      title: 'Öppettider',
      of: [
        {
          type: 'object',
          icon: ClockIcon,
          preview: {
            select: {
              day: 'day',
              time: 'time',
              closed: 'closed',
            },
            prepare({day, time, closed}) {
              return {
                title: day,
                subtitle: closed ? 'stängt' : time,
              }
            },
          },
          fields: [
            defineField({
              name: 'day',
              type: 'string',
              title: 'Veckodag',
            }),
            {
              name: 'time',
              type: 'string',
              title: 'Öppettider',
              hidden: ({parent}) => parent.closed,
            },
            {
              name: 'closed',
              type: 'boolean',
              title: 'Stängt',
              initialValue: false,
            },
          ],
        },
      ],
      initialValue: [
        {
          day: 'tisdag - fredag',
          time: '11-18',
        },
        {
          day: 'lördag',
          time: '9-16',
        },
        {
          day: 'söndag - måndag',
          closed: true,
        },
      ],
    },
    {
      name: 'irregular',
      type: 'array',
      title: 'Avvikande öppettider',
      of: [
        {
          type: 'object',
          icon: CalendarIcon,
          fields: [
            {
              name: 'date',
              type: 'date',
              title: 'Datum',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'closed',
              type: 'boolean',
              title: 'Stängt',
              initialValue: false,
            },
            {
              name: 'time',
              type: 'string',
              title: 'Öppettider',
              hidden: ({parent}) => parent.closed,
            },
            {
              name: 'name',
              type: 'string',
              title: 'Anledning',
            },
          ],
          preview: {
            select: {
              date: 'date',
              name: 'name',
              time: 'time',
              closed: 'closed',
            },
            prepare(selection) {
              return {
                title: `${selection.date} (${selection.name})`,
                subtitle: selection.closed ? 'stängt' : selection.time,
              }
            },
          },
        },
      ],
    },
  ],
})
