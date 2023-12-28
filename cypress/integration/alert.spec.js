/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it.only ('Alert', () => {
        /* cy.get('#alert').click()

        // Alert é um evento gerenciado pelo Window.
        // O comando cy.on pega eventos que ocorrem na tela.
        // O comando abaixo pega o evento do window:alert e salva
        // a string em msg, e depois a exibe no console.
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        }) */

        cy.clickAlert('#alert', 'Alert Simples')
    })

    it ('Alert com mock', () => {
        const stub = cy.stub().as('alerta') // o método .as permite atribuir um "alias" para o stub
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples') // Após o clique espera que a primeira chamada do stub tenha sido chamada com o parâmetro "Alert Simples"
        })
    })

    // Nesse teste vai exibir o Confirm e clicar em Ok, e fazer as assertivas
    it ('Confirm', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
        
        cy.get('#confirm').click()
    })

    // Nesse teste vai exibir o Confirm e clicar em Cancelar, e fazer as assertivas
    it ('Deny', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        
        cy.get('#confirm').click()
    })

    it ('Prompt', () => {
        
        // Armazena o objeto window dentro de win e utiliza um stub para retornar '42' na mensagem
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })

        // Faz uma assertiva para verificar o texto do confirm
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
        })

        // Faz uma assertiva para verificar o texto do alert
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

        // clica no botão cujo id é #prompt
        cy.get('#prompt').click()
    })

    it ('Desafio', () => {  
        const stub = cy.stub().as('alerta')

        cy.on('window:alert', stub)
        
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        
        cy.get('#formNome').type('Rafael')
        
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Ferraz')
        
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()

        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
    })
})