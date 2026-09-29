/// <reference types="cypress" />

describe('NCC Registration Package Selection', () => {

  beforeEach(() => {
    cy.login('admin')
  })

  function bukaPendaftaran() {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pendaftaran Baru')
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.url()
      .should('include', '/officer/packages')
  }

  function pilihPaket(namaPaket) {
    bukaPendaftaran()

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
          .should('exist')
          .click({ force: true })
      })

    cy.contains('Konfirmasi Pemilihan Paket')
      .should('exist')

    cy.contains('button', 'Ya, Lanjutkan')
      .should('exist')
      .click({ force: true })

    cy.url()
      .should('not.include', '/officer/packages')

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Pilih Paket')
      .and('not.contain.text', '404 Not Found')
      .and('not.contain.text', '500 Internal Server Error')
  }

  it('NCC-REG-PKG-001 - Select Konsultasi by RD Bronze Package', () => {
    pilihPaket('Konsultasi by RD Bronze')
  })

  it('NCC-REG-PKG-002 - Select BIA Inbody + Konsul Gold Package', () => {
    pilihPaket('BIA Inbody + Konsul Gold')
  })

  it('NCC-REG-PKG-003 - Select BIA Inbody + Konsul Silver Package', () => {
    pilihPaket('BIA Inbody + Konsul Silver')
  })

  it('NCC-REG-PKG-004 - Select BIA Inbody + Konsul Bronze Package', () => {
    pilihPaket('BIA Inbody + Konsul Bronze')
  })

  it('NCC-REG-PKG-005 - Select BIA Karada Scan + Konsul Basic Package', () => {
    pilihPaket('BIA Karada Scan + Konsul Basic')
  })

  it('NCC-REG-PKG-006 - Select AU + GD + Koles + HB Package', () => {
    pilihPaket('AU + GD + Koles + HB')
  })

  it('NCC-REG-PKG-007 - Select AU + GD + Koles Package', () => {
    pilihPaket('AU + GD + Koles')
  })

  it('NCC-REG-PKG-008 - Select Konsultasi by RD Gold Package', () => {
    pilihPaket('Konsultasi by RD Gold')
  })

  it('NCC-REG-PKG-009 - Select Konsultasi by RD Silver Package', () => {
    pilihPaket('Konsultasi by RD Silver')
  })

  it('NCC-REG-PKG-010 - Select BIA by Karada Scan Package', () => {
    pilihPaket('BIA by Karada Scan')
  })

  it('NCC-REG-PKG-011 - Select Konsultasi Basic by NF Package', () => {
    pilihPaket('Konsultasi Basic by NF')
  })

  it('NCC-REG-PKG-012 - Select Kolestrol Package', () => {
    pilihPaket('Kolestrol')
  })

  it('NCC-REG-PKG-013 - Select Hemoglobin HB Package', () => {
    pilihPaket('Hemoglobin')
  })

  it('NCC-REG-PKG-014 - Select Gula Darah GD Package', () => {
    pilihPaket('Gula Darah')
  })

  it('NCC-REG-PKG-015 - Select Asam Urat Package', () => {
    pilihPaket('Asam Urat')
  })

  it('NCC-REG-PKG-016 - Select Tensi Package', () => {
    pilihPaket('Tensi')
  })

  it('NCC-REG-PKG-017 - Select BIA by Inbody Package', () => {
    pilihPaket('BIA by Inbody')
  })

})