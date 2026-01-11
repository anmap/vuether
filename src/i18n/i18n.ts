import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      // App
      appName: 'Vuether',

      // Navigation
      home: 'Home',
      weather: 'Weather',
      close: 'Close',

      // Search
      searchPlaceholder: 'Search for a city or state',
      searchError: 'Sorry, something went wrong. Please try again.',
      searchNoResults: 'No results match for your search.',

      // Empty states
      noLocationsAdded: 'No locations added. To start tracking a location, search in the field above.',

      // About modal
      about: {
        title: 'About:',
        description: 'Vuether allows you to track the current and future weather of cities of your choosing.',
        howItWorks: 'How it works:',
        step1: 'Search for your city by entering the name into the search bar.',
        step2: 'Select a city within the results, this will take you to the current weather for your selection.',
        step3: 'Track the city by clicking on the "+" icon in the top right. This will save the city to view at a later time on the home page.',
        removingCity: 'Removing a city',
        removingCityDescription: 'If you no longer wish to track a city, simply select the city within the home page. At the bottom of the page, there will be an option to delete the city.',
      },

      // City view
      previewBanner: 'You are currently previewing this city, click the {icon} button to start tracking it.',
      feelsLike: 'Feels like',
      hourlyWeather: 'Hourly Weather',
      sevenDayForecast: '7-Day Forecast',
      high: 'H:',
      low: 'L:',
      removeCity: 'Remove City',

      // Document title
      documentTitle: 'Vuether',
    },
  },
});

export default i18n;
