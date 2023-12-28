/// <reference types="cypress" />

describe('Work with time', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to the past', () => {
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '28/12/2023')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        // Método Date recebe ano, mês, dia, hora, minuto e segundo
        // O mês começa em 0, ou seja, 0 = Janeiro, 1 = Fevereiro, etc.
        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')
    })

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '17037')
        // No método should, o parâmetro gt significa "greater than", ou seja, maior que
        cy.get('#resultado > span').invoke('text').should('gt', 1703792019839)

        cy.clock() // Zera o relógio
        cy.get('#buttonTimePassed').click()
        // No método should, o parâmetro lte significa "less than or equal", ou seja, menor ou igual
        cy.get('#resultado > span').invoke('text').should('lte', 0)
        // cy.wait(1000) // Espera 1 segundo
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').should('lte', 1000)
        
        cy.tick(5000) // Avança 5 segundos
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 5000)

        cy.tick(10000) // Avança 5 segundos
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 15000)
    })
})