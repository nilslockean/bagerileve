import {HelpCircleIcon} from '@sanity/icons'
import {SchemaTypeDefinition} from 'sanity'

export default <SchemaTypeDefinition>{
  name: 'faq',
  type: 'document',
  title: 'Vanliga frågor',
  icon: HelpCircleIcon,
  fields: [
    {
      name: 'question',
      type: 'string',
      title: 'Fråga',
    },
    {
      title: 'Svar',
      name: 'answer',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      title: 'Visa på',
      name: 'linkedPages',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'page'}],
        },
      ],
    },
  ],
}
