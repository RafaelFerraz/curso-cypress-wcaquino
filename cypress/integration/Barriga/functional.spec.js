/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('rafael@email.com')
        cy.get(':nth-child(2) > .form-control').type('rafael123')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('Should create an account', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type('Conta de teste')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        // cy.get(':nth-child(1) > :nth-child(2) > .fa-edit').click()
        // cy.get('[data-test=nome]').clear().type('Conta alterada')
        // cy.get('.btn').click()
        // cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso')
        cy.xpath("//table//td[contains(., 'Conta de teste')]/..//i[@class='far fa-edit']")
            .click()

        cy.get('[data-test=nome]').clear().type('Conta alterada')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso')
    })
})