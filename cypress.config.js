const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: 'https://playground.bondaracademy.com/',
    specPattern: 'test/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
      charts: true,
      reportPageTitle: 'Relatório de Testes Cypress',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});
