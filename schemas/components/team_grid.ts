import { UsersIcon } from '@sanity/icons/Users';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'team_grid',
  type: 'document',
  title: 'Team Grid',
  icon: UsersIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
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
      title: 'Section Title',
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Normal', value: 'normal' },
          ],
          lists: [],
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
    defineField({
      name: 'members',
      type: 'array',
      title: 'Members',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'member',
          title: 'Member',
          preview: {
            select: {
              title: 'name',
              subtitle: 'title',
              imageUrl: 'image.secure_url',
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
            }),
            defineField({
              name: 'image',
              type: 'cloudinary.asset',
              title: 'Thumbnail image',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'extra_members_title',
      type: 'string',
      title: 'Additional Members Title',
    }),
    defineField({
      name: 'extra_members',
      type: 'array',
      title: 'Additional Members',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'member',
          title: 'Member',
          preview: {
            select: {
              title: 'name',
              subtitle: 'title',
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
            }),
          ],
        }),
      ],
    }),
  ],
});
