import {BasketIcon} from '@sanity/icons'
import {SchemaTypeDefinition} from 'sanity'

export default <SchemaTypeDefinition>{
  name: 'orderTerms',
  type: 'document',
  title: 'Beställningsvillkor',
  icon: BasketIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Rubrik',
    },
    {
      title: 'Villkor',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      title: 'Ordning',
      name: 'sortOrder',
      type: 'number',
    },
    {
      title: 'Språk',
      name: 'language',
      type: 'string',
      readOnly: true,
    },
  ],
  orderings: [
    {
      title: 'Ordning',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
}
