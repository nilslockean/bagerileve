import {
  defineField,
  type ConditionalPropertyCallbackContext,
  type SchemaTypeDefinition,
} from 'sanity'
import {ClockIcon, CalendarIcon} from '@sanity/icons'
import {baseLanguage} from './localeString'

const _hasParentHours = (props: ConditionalPropertyCallbackContext) =>
  Boolean(props.document?.parent)

export default <SchemaTypeDefinition>{
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
      name: 'parent',
      type: 'reference',
      title: 'Överordnade öppettider',
      to: [{type: 'opening-hours'}],
      validation: (Rule) =>
        Rule.custom((fields: {_ref: string}, context) => {
          const docId = context.document?._id.replace('drafts.', '')
          const referenceId = fields?._ref.replace('drafts.', '')

          if (docId === referenceId) {
            return 'Öppettider kan inte referera till sig själv'
          }

          return true
        }),
    },
    {
      name: 'period',
      type: 'object',
      title: 'Period',
      fields: [
        {
          name: 'from',
          type: 'date',
          title: 'Från',
        },
        {
          name: 'to',
          type: 'date',
          title: 'Till',
        },
        {
          name: 'repeat',
          type: 'boolean',
          title: 'Upprepa varje år',
        },
      ],
      hidden: (props) => !_hasParentHours(props),
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
              title: `day.${baseLanguage.id}`,
              subtitle: `time.${baseLanguage.id}`,
            },
          },
          fields: [
            defineField({
              name: 'day',
              type: 'localeString',
              title: 'Veckodag',
            }),
            {
              name: 'time',
              type: 'localeString',
              title: 'Öppettider',
            },
          ],
        },
      ],
      initialValue: [
        {
          day: {
            sv: 'tisdag - fredag',
            en: 'Tuesday - Friday',
          },
          time: {
            sv: '11-18',
            en: '11-18',
          },
        },
        {
          day: {
            sv: 'lördag',
            en: 'Saturday',
          },
          time: {
            sv: '9-16',
            en: '9-16',
          },
        },
        {
          day: {
            sv: 'söndag - måndag',
            en: 'Sunday - Monday',
          },
          time: {
            sv: 'stängt',
            en: 'closed',
          },
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
              name: 'time',
              type: 'string',
              title: 'Öppettider',
              validation: (Rule) => Rule.required(),
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
            },
            prepare(selection) {
              return {
                title: `${selection.date}: ${selection.time}`,
                subtitle: selection.name,
              }
            },
          },
        },
      ],
      // hidden: (props) => _hasParentHours(props),
    },
  ],
}
