import { defineType } from 'sanity'

export default defineType({
    title: 'Rich Text Content',
    name: 'blockContent',
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading 1', value: 'h1' },
          { title: 'Heading 2', value: 'h2' }
        ],
        lists: [{ title: 'Bullet', value: 'bullet' }],
        marks: {
          decorators: [
            { title: 'Bold', value: 'strong' },
            { title: 'Italic', value: 'em' }
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              fields: [{ name: 'href', type: 'url', title: 'URL' }]
            }
          ]
        }
      }
    ]
  });
  