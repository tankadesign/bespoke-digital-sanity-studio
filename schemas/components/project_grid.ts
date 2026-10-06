import { ThLargeIcon } from '@sanity/icons/ThLarge';
import { defineArrayMember, defineField, defineType } from 'sanity';

// schemas/project.ts
export default defineType({
  name: 'project_grid',
  type: 'document',
  title: 'Project Grid',
  icon: ThLargeIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    },
    prepare(value, viewOptions) {
      const { title, subtitle } = value as { title: string; subtitle: string };
      return {
        title,
        subtitle: subtitle ? `Section title: ${subtitle}` : '',
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
      name: 'title',
      type: 'string',
      title: 'Section Title',
    }),
    defineField({
      name: 'feature_first',
      type: 'boolean',
      title: 'Feature first project',
      description:
        'If checked, the first project will be featured larger. You should have an odd number of projects in the grid for this to work well.',
    }),
    defineField({
      name: 'feature_all',
      type: 'boolean',
      title: 'Full width for all',
      description:
        'If checked, all projects will be featured larger. The "Feature first project" setting will be ignored.',
    }),
    defineField({
      name: 'columns',
      type: 'string',
      options: {
        list: [
          { title: '2 across', value: 'two' },
          { title: '3 across', value: 'three' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'Setting only applies to desktop',
      initialValue: 'two',
    }),
    defineField({
      name: 'more_link',
      type: 'object',
      title: 'More link',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button title',
        }),
        defineField({
          name: 'url',
          type: 'string',
          title: 'URL',
        }),
      ],
    }),
    defineField({
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [
        defineArrayMember({
          name: 'project',
          title: 'Project',
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
  ],
});
