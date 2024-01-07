import type {SchemaTypeDefinition} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {ComponentIcon} from '@sanity/icons'

export default <SchemaTypeDefinition>{
  name: 'page',
  type: 'document',
  title: 'Sidor',
  icon: DocumentTextIcon,
  preview: {
    select: {
      title: 'label',
    },
  },
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Namn*',
      description: 'Visas i navigeringen och i webbläsarfönstret',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Titel*',
      description: 'Visas överst på sidan',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug*',
      options: {
        source: 'label',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hero',
      type: 'object',
      title: 'Hero',
      fields: [
        {
          name: 'image',
          type: 'image',
          title: 'Utvald bild',
          description: 'Visas om ingen video är vald',
          hidden: ({parent, value}) => {
            return Boolean(!value && parent?.video)
          },
        },
        {
          name: 'video',
          type: 'file',
          title: 'Utvald video',
          options: {
            accept: ['video/*'],
          },
        },
      ],
    },
    {
      title: 'Ingress',
      name: 'excerpt',
      type: 'text',
    },
    {
      title: 'Beskrivning',
      name: 'description',
      description: 'Visas inramat ovanför innehållet',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
          ],
        },
      ],
    },
    {
      title: 'Innehåll*',
      name: 'content',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
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
    },
    {name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo'},
    {name: 'seoKeywords', title: 'Keywords', type: 'string', group: 'seo'},
    {name: 'seoSlug', title: 'Slug', type: 'slug', group: 'seo'},
    {name: 'seoImage', title: 'Image', type: 'image', group: 'seo'},
  ],
}
