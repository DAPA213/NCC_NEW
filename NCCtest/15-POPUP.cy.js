/// <reference types="cypress" />

describe('NCC Package Confirmation Popup', () => {

  beforeEach(() => {
    cy.login('admin')

    cy.visit('/officer/packages')

    cy.get('body')
      .should('be.visible')
  })

  it('NCC-PKG-POP-001 - Verify Confirmation Popup Display After Selecting Package', () => {
    cy.contains('Pilih Paket Ini')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.contains('Konfirmasi Pemilihan Paket')
      .should('be.visible')

    cy.contains('Anda akan memilih paket')
      .should('be.visible')

    cy.contains('button', 'Batal')
      .should('exist')

    cy.contains('button', 'Ya, Lanjutkan')
      .should('exist')
  })

    it('NCC-PKG-POP-002 - Verify Cancel Button on Confirmation Popup', () => {

  cy.contains('Pilih Paket Ini')
    .filter(':visible')
    .first()
    .scrollIntoView()
    .should('be.visible')
    .click()

  cy.contains('Konfirmasi Pemilihan Paket')
    .should('be.visible')

  cy.contains('Batal')
    .click({ force: true })

  cy.contains('Konfirmasi Pemilihan Paket')
    .should('not.be.visible')
})

  it('NCC-PKG-POP-003 - Verify Continue Button on Confirmation Popup', () => {
    cy.contains('Pilih Paket Ini')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.contains('Konfirmasi Pemilihan Paket')
      .should('be.visible')

    cy.contains('button', 'Ya, Lanjutkan')
      .click()

    cy.url()
      .should('not.include', '/officer/packages')
  })

  it('NCC-PKG-POP-004 - Verify Package Information in Confirmation Popup', () => {
    cy.contains('Pilih Paket Ini')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.contains('Konfirmasi Pemilihan Paket')
      .should('be.visible')

    cy.contains('Anda akan memilih paket')
      .should('exist')

    cy.contains('Anda akan diarahkan ke halaman')
      .should('exist')
  })

  it('NCC-PKG-POP-005 Verify Popup Can Be Opened Multiple Times', () => {

    cy.contains('Pendaftaran Baru')
        .scrollIntoView()
        .click({ force: true })

    cy.contains('Pilih Paket Ini')
        .filter(':visible')
        .first()
        .scrollIntoView()
        .click({ force: true })

    cy.contains('Konfirmasi Pemilihan Paket')
        .should('be.visible')

    cy.contains('Batal')
        .click({ force: true })

    cy.contains('Konfirmasi Pemilihan Paket')
        .should('not.be.visible')

    cy.contains('Pilih Paket Ini')
        .first()
        .click({ force: true })

    cy.contains('Konfirmasi Pemilihan Paket')
        .should('be.visible')
    })

})