import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {svSELocale} from '@sanity/locale-sv-se'
import {media} from 'sanity-plugin-media'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'Bageri Leve',

  projectId: 'mz20cm4o',
  dataset: 'production',

  plugins: [
    structureTool(),
    svSELocale(),
    media(),
    visionTool(),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        {id: 'sv', title: 'Swedish'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: ['faq', 'orderTerms'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
