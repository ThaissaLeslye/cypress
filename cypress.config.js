const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Configuração do Reporter para o Jenkins (JUnit)
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochaFile: 'cypress/results/results-[hash].xml', // Gera um XML único por spec
    toConsole: true, // Mostra o log no console do terminal/Jenkins
    outputs: true    // Inclui logs de erro no XML
  },
  
  e2e: {
    experimentalRunAllSpecs: true,
    specPattern: 'test/**/*.cy.{js,jsx,ts,tsx}', // Mantido o seu padrão
    
    setupNodeEvents(on, config) {
      return config;
    },
  },
  
  viewportWidth: 1280,
  viewportHeight: 720,
});