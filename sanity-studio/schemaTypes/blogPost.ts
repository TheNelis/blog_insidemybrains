import { defineType } from 'sanity';
import { defineField } from 'sanity';
import blockContent from './blockContent';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'category', type: 'string', validation: Rule => Rule.required() },
    { name: 'publishedAt', type: 'datetime', validation: Rule => Rule.required() },
    { name: 'content', title: 'Content', type: 'blockContent', validation: Rule => Rule.required() },
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'This will be generated automatically from the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
  ],
});
