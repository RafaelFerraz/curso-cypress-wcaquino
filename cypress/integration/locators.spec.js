/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload();
    });
    
    it('Using JQuery Selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input').click()
        
        // Seleciona elemento que contenha propriedade onclick que contenha a palavra Francisco
        cy.get("[onclick*='Francisco']")

        // Selecionar o input do primeiro registro cuja escolaridade seja Doutorado
        cy.get("#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) > input")
    });
    
})