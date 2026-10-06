import { TiersIcon } from '@sanity/icons/Tiers';
import React from 'react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { makeCloudinaryThumb } from '../../lib/util';

export default defineType({
  name: 'feature_carousel',
  type: 'document',
  title: 'Feature Carousel',
  icon: TiersIcon,
  preview: {
    select: {
      title: 'name',
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'optional title to show above the carousel',
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Description',
      description: 'optional description to show above the carousel',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
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
      name: 'slides',
      type: 'array',
      title: 'Slides',
      validation: (Rule) => Rule.required().min(3).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'slide',
          title: 'Slide',
          preview: {
            select: {
              title: 'title',
              image: 'media.image',
            },
            prepare({ title, image }: any) {
              // get image from media reference
              return {
                title,
                media: image ? React.createElement('img', { src: makeCloudinaryThumb(image.secure_url) }) : undefined,
              };
            },
          },
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
            }),
            defineField({
              name: 'media',
              weak: true,
              type: 'reference',
              to: [{ type: 'project_media' }],
            }),
            defineField({
              name: 'body',
              type: 'array',
              title: 'Body',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
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
              name: 'body_truncated',
              type: 'array',
              title: 'Truncated Body',
              description: 'For mobile reduce the amount of copy to fit on 4-5 lines',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
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
              name: 'has_button',
              type: 'boolean',
              title: 'Has button',
              initialValue: false,
            }),
            defineField({
              name: 'button_title',
              type: 'string',
              title: 'Button title',
              hidden: ({ parent }) => !parent?.has_button,
            }),
            defineField({
              name: 'button_url',
              type: 'string',
              title: 'Button URL',
              hidden: ({ parent }) => !parent?.has_button,
            }),
          ],
        }),
      ],
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
