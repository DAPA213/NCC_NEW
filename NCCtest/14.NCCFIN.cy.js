/// <reference types="cypress" />

describe('NCC Package and Financial Report', () => {

  beforeEach(() => {
    cy.login('admin')
  })

  it('NCC-PKG-001 - View Package List', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.contains('Pilih Paket Ini')
      .should('exist')
  })

  it('NCC-PKG-002 - Verify Package Information Display', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('contain.text', 'Rp')

    cy.get('p:visible')
      .should('have.length.greaterThan', 0)

    cy.contains('Pilih Paket Ini')
      .should('exist')
  })

  it('NCC-PKG-003 - Select Consultation Package', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('include', '/officer/packages')

    cy.contains('Pilih Paket Ini')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click()
  })

  it('NCC-PKG-004 - Select Bundle Package', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('include', '/officer/packages')

    cy.contains(/Bundle/i)
      .first()
      .scrollIntoView()
      .should('exist')

    cy.contains(/Bundle/i)
      .first()
      .parents()
      .contains('Pilih Paket Ini')
      .should('be.visible')
      .click()
  })

  it('NCC-PKG-005 - Verify Package Price Display', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('contain.text', 'Rp')

    cy.get('body')
      .should('not.contain.text', 'Rp 0')
  })

  it('NCC-FIN-001 - Access Financial Report Page', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Laporan Keuangan')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('include', '/admin/reports/financial')

    cy.contains('Laporan Keuangan')
      .should('exist')

    cy.get('body')
      .should('be.visible')
      .and('not.contain.text', '500 Internal Server Error')
      .and('not.contain.text', '404 Not Found')
  })

  it('NCC-PKG-006 - Verify Consultation Session Badge', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('contain.text', 'Sesi')
  })

  it('NCC-PKG-007 - Verify Package Card Layout', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.contains('Pilih Paket Ini')
      .should('exist')

    cy.contains('Pilih Paket Ini')
      .each(($button) => {
        cy.wrap($button)
          .scrollIntoView()
          .should('be.visible')
      })
  })

  it('NCC-PKG-008 - Verify Package Button Visibility', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.contains('Pilih Paket Ini')
      .should('exist')

    cy.contains('Pilih Paket Ini')
      .each(($button) => {
        cy.wrap($button)
          .scrollIntoView()
          .should('be.visible')
      })
  })

  it('NCC-PKG-009 - Verify Package Description Display', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('p:visible')
      .should('have.length.greaterThan', 0)
  })

  it('NCC-PKG-010 - Verify Package Page Loading', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('be.visible')
      .and('not.contain.text', '500 Internal Server Error')
      .and('not.contain.text', '404 Not Found')

    cy.contains('Pilih Paket Ini')
      .should('exist')
  })

})