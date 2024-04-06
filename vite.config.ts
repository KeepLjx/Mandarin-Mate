import { defineConfig } from "vite";
// @ts-ignore
import nested from 'tailwindcss/nesting';
import uni from "@dcloudio/vite-plugin-uni";
import tailwindcss from 'tailwindcss';
import tailwindConfig from "./tailwind.config";
import UniAppTailwindPlugin from "@uni-helper/vite-plugin-uni-tailwind";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), UniAppTailwindPlugin({
    shouldApply: true,
  })],
  css: {
    postcss: {
      plugins: [
        nested(),
        tailwindcss({
          config: tailwindConfig
        }),
        require('autoprefixer'),
      ],
    }
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: true,
    __INTLIFY_PROD_DEVTOOLS__: false,
  }
});
