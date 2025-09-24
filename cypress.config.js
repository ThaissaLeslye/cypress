const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: 'http://127.0.0.1:5500',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório de Testes Cypress',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    // Garante que um ficheiro JSON é gerado
    json: true,
  },
    specPattern: 'test/**/*.cy.{js,jsx,ts,tsx}',
  },
  viewportWidth: 1280,
  viewportHeight: 720
});

