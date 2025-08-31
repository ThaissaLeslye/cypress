const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: 'https://playground.bondaracademy.com/',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  reporter: 'cypress-mochawesome-reporter', // <---- MUDE AQUI
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório dos Testes Cypress',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
    specPattern: 'test/**/*.cy.{js,jsx,ts,tsx}',
  },
  viewportWidth: 1280,
  viewportHeight: 720
});
