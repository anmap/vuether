# Vuether

A Vue 3 weather application built with TypeScript and Vite, for learning purposes.

This project follows the tutorial at [Vue 3 Weather App Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hfoy8vFQ5tbXO3vY0xhhUZ), with the following differences:

- Written in **TypeScript** instead of JavaScript
- Uses newer API versions of **MapBox** and **OpenWeatherMap**
- Includes **internationalization (i18n)** support using `vue-i18n`, with English and Finnish translations for all user-facing text and weather condition descriptions

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Environment Setup

Before running the project, you must create a `.env` file in the root directory with the following environment variables:

```env
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
VITE_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
```

Replace the placeholder values with your actual API keys:

- Get your MapBox access token from [MapBox Account](https://account.mapbox.com/)
- Get your OpenWeatherMap API key from [OpenWeatherMap](https://openweathermap.org/api)

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
yarn build

# Runs the end-to-end tests
yarn test:e2e
# Runs the tests only on Chromium
yarn test:e2e --project=chromium
# Runs the tests of a specific file
yarn test:e2e tests/example.spec.ts
# Runs the tests in debug mode
yarn test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
