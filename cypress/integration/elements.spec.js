/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')

    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        // Recarrega a tela (refresh)
        cy.reload()

        cy.get('#resultado').should('have.not.text', 'Voltou!')

        // Busca o primeiro elemento que contém o texto 'Voltar'
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')

        // Para acessar atributo de texto de um campo de texto, utilizar 'have.value'
        cy.get('#formNome').should('have.value', 'Cypress Test')

        // TEXT AREA
        // O seletor abaixo com : dá problema para o Cypress reconhecer.
        // Para solucionar isso, utilizar \\ antes de :
        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')
        
        //Uso de tecla backspace durante o type
        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

            cy.get('#elementosForm\\:sugestoes')
            .clear()
            // O objeto {delay:100} configura um delay (em milissegundos) durante a escrita
            .type('Erro{selectall}Acerto', {delay:100})
            .should('have.value', 'Acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.screenshot('#formSexoMasc').should('not.be.checked')

        // Para realizar uma busca por alguma propriedade do objeto, utilizar colchete []
        cy.get("[name='formSexo']").should('have.length', 2)
    })

    it('CheckBox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita]').click({multiple: true})
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it ('Combobox', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')
        
        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')

            cy.get('[data-test=dataEscolaridade] option')
                .should('have.length', 8)
            
            cy.get('[data-test=dataEscolaridade] option').then($arr => {
                const values = []
                $arr.each(function() {
                    values.push(this.innerHTML)
                })
                expect(values).to.include.members(["Superior", "Mestrado"])
            })
    })

    it.only ('Combo multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada'])
        
        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })

        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('eql', ['natacao', 'Corrida', 'nada'])
    })
})