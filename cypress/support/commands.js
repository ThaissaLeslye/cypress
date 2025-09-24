/// <reference types="cypress" />

Cypress.Commands.add('selectDayFromCurrentDay', (futureDay) => {
    cy.get('#timeSlots').then($div => {
        const $enabled = $div.find('.enabled');

        if ($enabled.length > 0) {
            // se houver pelo menos um horário habilitado → clica no primeiro
            cy.wrap($enabled.first()).click();
        } else {
            futureDay += 1;
            cy.log(futureDay)
            cy.get('.btn-outline-secondary')
                .click();
            cy.get('.day')
                .not('.new') 
                .contains(futureDay)
                .click()
            cy.selectDayFromCurrentDay(futureDay)
        }
    });
});