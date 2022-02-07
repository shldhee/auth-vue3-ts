/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
module.exports = {
  'src/**/*.{js,jsx,vue,ts,tsx}': ['npm run lint'],
  '*.{vue,ts}': [() => `vue-tsc --noEmit --skipLibCheck`]
}
