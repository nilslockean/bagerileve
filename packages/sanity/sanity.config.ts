import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {svSELocale} from '@sanity/locale-sv-se'
import {media} from 'sanity-plugin-media'
import {webhooksTrigger} from 'sanity-plugin-webhooks-trigger'

export default defineConfig({
  name: 'default',
  title: 'Bageri Leve',

  projectId: 'mz20cm4o',
  dataset: 'production',

  plugins: [
    deskTool(),
    svSELocale(),
    media(),
    visionTool(),
    webhooksTrigger({
      title: 'Deploy',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
