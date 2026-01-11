export default {
  // App
  appName: 'Vuether',

  // Navigation
  home: 'Koti',
  weather: 'Sää',
  close: 'Sulje',

  // Search
  search: {
    placeholder: 'Etsi kaupunkia tai osavaltiota',
    error: 'Pahoittelut, jotain meni pieleen. Yritä uudelleen.',
    noResults: 'Hakuehdoillesi ei löytynyt tuloksia.',
  },

  // Empty states
  noLocationsAdded: 'Ei lisättyjä sijainteja. Aloita sijaintien seuraaminen etsimällä kentästä yllä.',

  // About modal
  about: {
    title: 'Tietoja:',
    description: 'Vuetherin avulla voit seurata valitsemiesi kaupunkien nykyistä ja tulevaa säätä.',
    howItWorks: 'Miten se toimii:',
    step1: 'Etsi kaupunkisi kirjoittamalla sen nimi hakukenttään.',
    step2: 'Valitse kaupunki tuloksista, jolloin siirryt kyseisen kaupungin nykyiseen säätilaan.',
    step3: 'Seuraa kaupunkia klikkaamalla oikeassa yläkulmassa olevaa "+"-kuvaketta. Tämä tallentaa kaupungin katsottavaksi myöhemmin kotisivulla.',
    removingCity: 'Kaupungin poistaminen',
    removingCityDescription: 'Jos et enää halua seurata kaupunkia, valitse yksinkertaisesti kaupunki kotisivulta. Sivun alaosassa on vaihtoehto kaupungin poistamiseen.',
  },

  // City view
  cityView: {
    previewBanner: 'painiketta aloittaaksesi sen seuraamisen.',
    previewBannerPrefix: 'Olet tällä hetkellä esikatselemassa tätä kaupunkia, klikkaa',
    feelsLike: 'Tuntuu kuin',
    hourlyWeather: 'Tuntikohtainen sää',
    sevenDayForecast: '7 päivän ennuste',
    high: 'Y:',
    low: 'A:',
    removeCity: 'Poista kaupunki',
  },

  // Document title
  documentTitle: 'Vuether',
};
