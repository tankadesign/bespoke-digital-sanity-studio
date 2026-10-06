import { visionTool } from '@sanity/vision';
import { defineConfig, isDev } from 'sanity';
import { buildThemeFromUrl } from '@sanity/themer-legacy';
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { taxonomyManager } from 'sanity-plugin-taxonomy-manager';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';
import { BespokeLogo } from './ui/BespokeLogo';

const theme = buildThemeFromUrl(
  'https://themer.sanity.build/api/hues?default=60929e&primary=d8172e&transparent=60929e&positive=43d675;300&caution=fbd024;200&lightest=fcfdfd&darkest=0d1415',
);

console.log('sanity studio', { isDev });

export default defineConfig({
  name: 'default',
  title: 'Bespoke',
  studio: {
    components: {
      logo: BespokeLogo,
    },
  },

  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET as string,

  plugins: [structureTool(), visionTool(), simplerColorInput(), taxonomyManager({}), cloudinarySchemaPlugin()],

  schema: {
    types: schemaTypes,
  },
  theme,
  document: {
    productionUrl: async (prev, context) => {
      const domain = isDev ? 'http://localhost:5552' : 'https://bespokedigital.com';
      const { getClient, document } = context;
      const client = getClient({ apiVersion: '2026-03-05' });
      if (document._type === 'page') {
        const slug = await client.fetch(`*[_type == 'page' && _id == $postId][0].slug.current`, {
          postId: document._id,
        });
        return `${domain}/${slug}?enable-previews=1`;
      } else if (document._type === 'project') {
        const slug = await client.fetch(`*[_type == 'project' && _id == $postId][0].slug.current`, {
          postId: document._id,
        });
        return `${domain}/work/${slug}/?enable-previews=1`;
      }
      return prev;
    },
  },
});
