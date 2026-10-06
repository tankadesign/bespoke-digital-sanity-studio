import { ThLargeIcon } from '@sanity/icons/ThLarge';
import React from 'react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { makeCloudinaryThumb } from '../../lib/util';
import { LayoutRadioInput } from '../../tools/LayoutButtons';

const layoutMediaCount: Record<string, number> = {
  one_full: 1,
  one_text: 1,
  text_one: 1,
  two: 2,
  one_two: 3,
  two_one: 3,
  one_three: 4,
  three_one: 4,
  three: 3,
  four: 4,
  one_half_half: 3,
  half_half_one: 3,
  complex_grid_1: 4,
  complex_grid_2: 5,
  complex_grid_3: 4,
  complex_grid_4: 4,
  complex_grid_5: 5,
  complex_grid_6: 4,
};

const layouts = [
  { title: '1 + 2', value: 'one_two' },
  { title: '2 + 1', value: 'two_one' },
  { title: '3 + 1', value: 'three_one' },
  { title: '1 + 3', value: 'one_three' },
  { title: '1 full', value: 'one_full' },
  { title: 'Two across', value: 'two' },
  { title: 'Three across', value: 'three' },
  { title: 'Four across', value: 'four' },
  { title: '1 + 1/2 + 1/2', value: 'one_half_half' },
  { title: '1/2 + 1/2 + 1', value: 'half_half_one' },
  { title: 'Complex grid 1', value: 'complex_grid_1' },
  { title: 'Complex grid 2', value: 'complex_grid_2' },
  { title: 'Complex grid 3', value: 'complex_grid_3' },
  { title: 'Complex grid 4', value: 'complex_grid_4' },
  { title: 'Complex grid 5', value: 'complex_grid_5' },
  { title: 'Complex grid 6', value: 'complex_grid_6' },
  { title: '1 + text', value: 'one_text' },
  { title: 'text + 1', value: 'text_one' },
];

// schemas/project.ts
export default defineType({
  name: 'media_group',
  type: 'document',
  title: 'Media Group',
  icon: ThLargeIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'layout',
      imageUrl: 'media.0.image.secure_url',
    },
    prepare(value, viewOptions) {
      const { title, subtitle, imageUrl } = value as { title: string; subtitle: string; imageUrl: string };
      return {
        title,
        subtitle: `Media Group | Layout: ${layouts.find((item) => item.value === subtitle)?.title ?? subtitle}`,
        media: imageUrl ? React.createElement('img', { src: makeCloudinaryThumb(imageUrl) }) : undefined,
      };
    },
  },
  fieldsets: [
    {
      hidden: ({ value }) => !(value.layout === 'one_text' || value.layout === 'text_one'),
      name: 'text-block',
      title: 'Text',
      options: { collapsible: false, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout',
      hidden: ({ parent }) => parent.title == '' && parent.description == '',
      initialValue: 'one_two',
      components: { input: LayoutRadioInput },
      options: {
        list: layouts,
      },
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Content',
      fieldset: 'text-block',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Normal', value: 'normal' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'text_align',
      type: 'string',
      title: 'Alignment',
      hidden: ({ parent }) => parent.title == '' && parent.description == '',
      initialValue: 'centered',
      fieldset: 'text-block',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Centered', value: 'centered' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'media',
      type: 'array',
      title: 'Media',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const layout = (context.parent as any)?.layout as string | undefined;
          const required = layout ? layoutMediaCount[layout] : undefined;
          const count = Array.isArray(value) ? value.length : 0;
          if (!required) return count >= 1 ? true : 'At least 1 media item is required.';
          if (count !== required) {
            return `The "${layout}" layout requires exactly ${required} media item${required !== 1 ? 's' : ''}.`;
          }
          return true;
        }),
      of: [
        defineField({
          name: 'media',
          weak: true,
          type: 'reference',
          to: [{ type: 'project_media' }],
        }),
      ],
    }),
    defineField({
      name: 'collapse_margin',
      type: 'boolean',
      title: 'Collapse margin to next Media Group',
      description:
        'When multiple Media Group modules are stacked on a page, the gap between this one and the next can be collapsed to create a nice evenly spaced grid',
      initialValue: true,
    }),
  ],
});
