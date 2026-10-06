import { CommentIcon } from '@sanity/icons/Comment';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'quote',
  type: 'document',
  title: 'Quote',
  icon: CommentIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'quote',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle,
      };
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'quote',
      type: 'string',
      title: 'Quote',
      description: 'Do not add quotes around the text, they will be added.',
    }),
    defineField({
      name: 'byline',
      type: 'string',
      title: 'Byline',
      description: 'Do not include a dash at the beginning of the byline, it will be added.',
    }),
    defineField({
      name: 'image',
      type: 'cloudinary.asset',
      title: 'Image',
    }),
    defineField({
      name: 'text_color',
      type: 'string',
      title: 'Text color',
      initialValue: 'white',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Green', value: 'green' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
});
