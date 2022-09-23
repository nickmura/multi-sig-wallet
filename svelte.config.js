import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({ postcss: true }),

  kit: {
    trailingSlash: 'always',
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      edge: false,
      split: false,
      fallback: 'index.html',
      precompress: false
    })
  }
};

export default config;
