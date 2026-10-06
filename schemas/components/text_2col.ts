import { InlineIcon } from '@sanity/icons/Inline';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { ParagraphLarge, PreHeader } from '../../tools/Components';

export default defineType({
  name: 'text_2col',
  type: 'document',
  title: 'Text 2 Column',
  icon: InlineIcon,
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }: any) {
      return {
        title,
        subtitle: 'Text 2 Column',
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
      name: 'col1',
      type: 'array',
      title: 'Column 1',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 5', value: 'h5', component: PreHeader },
            { title: 'Normal', value: 'normal' },
            { title: 'Paragraph Large', value: 'p', component: ParagraphLarge },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'col2',
      type: 'array',
      title: 'Column 2',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Heading 4', value: 'h4' },
            { title: 'Normal', value: 'normal' },
            { title: 'Paragraph Large', value: 'p', component: ParagraphLarge },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'indented',
      type: 'boolean',
      title: 'Indented on desktop',
      initialValue: true,
    }),
    defineField({
      name: 'use_stylized_list',
      title: 'Use stylized bullets',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'background_color',
      type: 'string',
      title: 'Background color',
      initialValue: 'transparent',
      options: {
        list: [
          { title: 'Transparent', value: 'transparent' },
          { title: 'Dark', value: 'dark' },
          { title: 'Darker', value: 'darker' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
});
