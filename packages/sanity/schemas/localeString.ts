import {defineType} from 'sanity'

type Language = {
  id: string
  title: string
  isDefault?: boolean
}

type BaseLanguage = Required<Language>

const supportedLanguages: [BaseLanguage, Language] = [
  {id: 'sv', title: 'Swedish', isDefault: true},
  {id: 'en', title: 'English'},
]

export const baseLanguage = supportedLanguages.find((l) => l.isDefault) as BaseLanguage

export const localeString = defineType({
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true},
    },
  ],
  // Dynamically define one field per language
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    // fieldset: lang.isDefault ? undefined : 'translations',
  })),
})
