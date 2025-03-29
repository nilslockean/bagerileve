import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {svSELocale} from '@sanity/locale-sv-se'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'Bageri Leve',

  projectId: 'mz20cm4o',
  dataset: 'production',

  plugins: [structureTool(), svSELocale(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
