import { CogIcon } from '@sanity/icons/Cog';
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe';
import React from 'react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import timezones, { TimeZone } from 'timezones-list';

const timezoneOptions = timezones.map((tz: TimeZone) => {
  return { title: tz.label, value: tz.tzCode };
});
timezoneOptions.sort((a, b) => a.title.localeCompare(b.title));

// schemas/config.ts
export default defineType({
  name: 'config',
  type: 'document',
  title: 'Config',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'main_menu',
      type: 'array',
      title: 'Main Menu',
      of: [
        defineArrayMember({
          name: 'menu_item',
          type: 'object',
          title: 'Menu Item',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
            }),
            defineField({
              name: 'page',
              type: 'reference',
              title: 'Page',
              to: [{ type: 'page' }],
            }),
            defineField({
              name: 'children',
              type: 'array',
              title: 'Sub Items',
              of: [
                defineArrayMember({
                  name: 'sub_menu_item',
                  type: 'object',
                  title: 'Sub Menu Item',
                  fields: [
                    defineField({
                      name: 'title',
                      type: 'string',
                      title: 'Title',
                    }),
                    defineField({
                      name: 'page',
                      type: 'reference',
                      title: 'Page',
                      to: [{ type: 'page' }],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'page.name',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'page.name',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'socials_group',
      type: 'object',
      title: 'Socials',
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Title',
          initialValue: 'Follow us',
        }),
        defineField({
          name: 'socials_links',
          type: 'array',
          title: 'Links',
          of: [
            defineArrayMember({
              name: 'social',
              type: 'object',
              title: 'Social',
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'url',
                  imageUrl: 'icon.asset.url',
                },
                prepare({ title, subtitle, imageUrl }: any) {
                  const img = React.createElement('img', {
                    src: imageUrl,
                    style: { backgroundColor: 'black' },
                  });
                  return {
                    title,
                    subtitle,
                    media: img,
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
                  name: 'url',
                  type: 'string',
                  title: 'URL',
                }),
                defineField({
                  name: 'icon',
                  type: 'file',
                  title: 'SVG Icon',
                  description: '1:1 aspect ratio, white fills or strokes, transparent background',
                  options: {
                    accept: 'image/svg+xml',
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'locations',
      type: 'array',
      title: 'Locations',
      of: [
        defineArrayMember({
          name: 'location',
          type: 'object',
          title: 'Location',
          icon: EarthGlobeIcon,
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Name',
            }),
            defineField({
              name: 'timezone',
              type: 'string',
              title: 'Timezone',
              options: {
                list: timezoneOptions,
                direction: 'vertical',
                layout: 'dropdown',
              },
            }),
            defineField({
              name: 'address',
              type: 'text',
              title: 'Address',
            }),
            defineField({
              name: 'email',
              type: 'string',
              title: 'Email',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'solutions',
      type: 'object',
      title: 'Solutions',
      description: 'Appears above newsletter form in footers',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Our Solutions',
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
              lists: [{ title: 'Bullet', value: 'bullet' }], // yes please, both bullet and numbered
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'newsletter_form_title',
      type: 'string',
      title: 'Newsletter form title',
      initialValue: 'Subscribe to our newsletter',
    }),

    defineField({
      name: 'border_radius',
      type: 'number',
      title: 'Border Radius',
      description: 'For buttons and form fields',
      initialValue: 24,
      validation: (Rule) => Rule.positive().integer().min(0).max(24),
    }),
  ],
});
