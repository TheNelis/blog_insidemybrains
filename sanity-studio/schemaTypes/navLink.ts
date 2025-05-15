import { defineType } from 'sanity';

export default defineType({
  name: 'navLink',
  title: 'Nav Link',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Link name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'external',
      title: 'External',
      type: 'boolean',
      description: 'Check this if the link is external',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }
  ],
});
