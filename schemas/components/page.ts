import { DocumentsIcon } from '@sanity/icons/Documents';
import { defineArrayMember, defineField, defineType } from 'sanity';
// schemas/project.ts
export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Match the path name of the page on the website (e.g. work, about, connect)',
      options: {
        source: 'name',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/[^a-z0-9_-]/g, '')
            .slice(0, 200),
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Meta description',
      description: 'Used for SEO and social sharing. 1-2 short sentences.',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'reference',
      to: [{ type: 'hero' }, { type: 'multi_hero' }],
    }),
    defineField({
      name: 'components',
      type: 'array',
      title: 'Components',
      of: [
        defineArrayMember({
          name: 'projects',
          title: 'Project Grid',
          type: 'reference',
          to: [{ type: 'project_grid' }],
        }),
        defineArrayMember({
          name: 'project_media_ref',
          title: 'Single Project Media',
          type: 'reference',
          to: [{ type: 'project_media' }],
        }),
        defineArrayMember({
          name: 'media_group_ref',
          title: 'Media Group',
          type: 'reference',
          to: [{ type: 'media_group' }],
        }),
        defineArrayMember({
          name: 'logo_grid_ref',
          title: 'Logo Grid',
          type: 'reference',
          to: [{ type: 'logo_grid' }],
        }),
        defineArrayMember({
          name: 'text_only_ref',
          title: 'Text Block',
          type: 'reference',
          to: [{ type: 'text_only' }],
        }),
        defineArrayMember({
          name: 'columned_text_ref',
          title: 'Columned Text',
          type: 'reference',
          to: [{ type: 'columned_text' }],
        }),
        defineArrayMember({
          name: 'text_2col_ref',
          title: 'Text 2 Column',
          type: 'reference',
          to: [{ type: 'text_2col' }],
        }),
        defineArrayMember({
          name: 'client_list_ref',
          title: 'Client List',
          type: 'reference',
          to: [{ type: 'client_list' }],
        }),
        defineArrayMember({
          name: 'team_grid_ref',
          title: 'Team Grid',
          type: 'reference',
          to: [{ type: 'team_grid' }],
        }),
        defineArrayMember({
          name: 'form_ref',
          title: 'Form',
          type: 'reference',
          to: [{ type: 'form' }],
        }),
        defineArrayMember({
          name: 'quote_ref',
          title: 'Quote',
          type: 'reference',
          to: [{ type: 'quote' }],
        }),
        defineArrayMember({
          name: 'feature_carousel_ref',
          title: 'Feature Carousel',
          type: 'reference',
          to: [{ type: 'feature_carousel' }],
        }),
      ],
    }),
    /* defineField({
      name: 'bg_color',
      type: 'string',
      title: 'Background Color',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Rust', value: 'rust' },
          { title: 'Olive', value: 'olive' },
        ],
        direction: 'vertical',
        layout: 'radio',
      }
    }), */
    defineField({
      name: 'bg_color',
      type: 'simplerColor',
      title: 'Background Color',
      options: {
        enableAlpha: false,
        colorList: [
          { label: 'Dark Gray', value: '#262626' },
          { label: 'Rust', value: '#6d3434' },
          { label: 'Olive', value: '#3f4239' },
          { label: 'Cream', value: '#EFF4E3' },
          { label: 'Light Goldenrod', value: '#E9F1CF' },
          { label: 'Custom...', value: 'custom' },
        ],
      },
    }),
    defineField({
      name: 'footer_contact',
      type: 'boolean',
      title: 'Show Contact in Footer',
      initialValue: true,
    }),
  ],
});
