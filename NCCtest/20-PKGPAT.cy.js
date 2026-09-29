/// <reference types="cypress" />

describe('NCC Patient Package Selection', () => {

  beforeEach(() => {
    cy.login('patient')
  })

  function bukaBeliPaket() {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click({ force: true })

    cy.contains('Beli Paket')
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.url()
      .should('include', '/patient/packages')
  }

  function pilihPaket(namaPaket) {
    bukaBeliPaket()

    cy.contains(namaPaket)
      .scrollIntoView()
      .should('exist')

    cy.contains(namaPaket)
      .parents()
      .filter(function () {
        return Cypress.$(this)
          .find('button')
          .filter(function () {
            return Cypress.$(this)
              .text()
              .trim() === 'Pilih Paket Ini'
          })
          .length > 0
      })
      .first()
      .within(function () {
        cy.contains('button', 'Pilih Paket Ini')
          .scrollIntoView()
          .should('exist')
          .click({ force: true })
      })

    cy.contains('Konfirmasi Pemilihan Paket')
      .should('exist')

    cy.contains('button', 'Ya, Lanjutkan')
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.url()
      .should('not.include', '/patient/packages')

    cy.get('body')
      .should('be.visible')
      .and('not.contain.text', '404 Not Found')
      .and('not.contain.text', '500 Internal Server Error')
  }

  it('NCC-PAT-PKG-001 - Select Konsultasi by RD Bronze Package', () => {
    pilihPaket('Konsultasi by RD Bronze')
  })

  it('NCC-PAT-PKG-002 - Select BIA Inbody + Konsul Gold Package', () => {
    pilihPaket('BIA Inbody + Konsul Gold')
  })

  it('NCC-PAT-PKG-003 - Select BIA Inbody + Konsul Silver Package', () => {
    pilihPaket('BIA Inbody + Konsul Silver')
  })

  it('NCC-PAT-PKG-004 - Select BIA Inbody + Konsul Bronze Package', () => {
    pilihPaket('BIA Inbody + Konsul Bronze')
  })

  it('NCC-PAT-PKG-005 - Select BIA Karada Scan + Konsul Basic Package', () => {
    pilihPaket('BIA Karada Scan + Konsul Basic')
  })

  it('NCC-PAT-PKG-006 - Select AU + GD + Koles + HB Package', () => {
    pilihPaket('AU + GD + Koles + HB')
  })

  it('NCC-PAT-PKG-007 - Select AU + GD + Koles Package', () => {
    pilihPaket('AU + GD + Koles')
  })

  it('NCC-PAT-PKG-008 - Select Konsultasi by RD Gold Package', () => {
    pilihPaket('Konsultasi by RD Gold')
  })

  it('NCC-PAT-PKG-009 - Select Konsultasi by RD Silver Package', () => {
    pilihPaket('Konsultasi by RD Silver')
  })

  it('NCC-PAT-PKG-010 - Select BIA by Karada Scan Package', () => {
    pilihPaket('BIA by Karada Scan')
  })

  it('NCC-PAT-PKG-011 - Select Konsultasi Basic by NF Package', () => {
    pilihPaket('Konsultasi Basic by NF')
  })

  it('NCC-PAT-PKG-012 - Select Kolestrol Package', () => {
    pilihPaket('Kolestrol')
  })

  it('NCC-PAT-PKG-013 - Select Hemoglobin Package', () => {
    pilihPaket('Hemoglobin')
  })

  it('NCC-PAT-PKG-014 - Select Gula Darah Package', () => {
    pilihPaket('Gula Darah')
  })

  it('NCC-PAT-PKG-015 - Select Asam Urat Package', () => {
    pilihPaket('Asam Urat')
  })

  it('NCC-PAT-PKG-016 - Select Tensi Package', () => {
    pilihPaket('Tensi')
  })

  it('NCC-PAT-PKG-017 - Select BIA by Inbody Package', () => {
    pilihPaket('BIA by Inbody')
  })

})