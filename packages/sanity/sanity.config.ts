import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {svSELocale} from '@sanity/locale-sv-se'

export default defineConfig({
  name: 'default',
  title: 'Bageri Leve',

  projectId: 'mz20cm4o',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), svSELocale()],

  schema: {
    types: schemaTypes,
  },
})
