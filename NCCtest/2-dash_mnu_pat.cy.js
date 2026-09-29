/// <reference types="cypress" />

describe('NCC Dashboard & Patient Management', () => {

  beforeEach(() => {
    cy.login('admin')
  })

  it('NCC-DAS-001 Dashboard after Login', () => {
    cy.url()
      .should('include', '/admin')

    cy.get('body')
      .should('contain.text', 'Dashboard')

    cy.contains('Kelola Pasien')
      .should('exist')

    cy.contains('Kelola Konselor')
      .should('exist')

    cy.contains('Kelola Petugas')
      .should('exist')

    cy.contains('Kelola E-Leaflet')
      .should('exist')
  })

  it('NCC-DAS-002 Overview page - Layanan NCC', () => {
    cy.url()
      .should('include', '/admin')

    cy.get('body')
      .should('contain.text', 'Dashboard')

    cy.get('body')
      .should('contain.text', 'Pasien')

    cy.get('body')
      .should('contain.text', 'Konselor')
  })

  it('NCC-PAS-001 Access Patient Management Page', () => {
    cy.visit('/admin/patients')

    cy.url()
      .should('include', '/admin/patients')

    cy.contains('Daftar Pasien')
      .should('be.visible')

    cy.contains('Tambah Pasien')
      .should('be.visible')

    cy.contains('Nama Pasien')
      .should('be.visible')
  })

  it('NCC-PAS-002 Password Minimum Length Validation', () => {
    cy.visit('/admin/patients/create')

    cy.url()
      .should('include', '/admin/patients/create')

    cy.get('input[placeholder*="RM"]')
      .should('be.visible')
      .type('RMTEST001')

    cy.get('input[placeholder*="Siti"]')
      .should('be.visible')
      .type('Cypress Test')

    cy.get('input[type="email"]')
      .should('be.visible')
      .type(`test${Date.now()}@gmail.com`)

    cy.get('input[type="password"]')
      .should('be.visible')
      .type('12345')

    cy.get('input[placeholder*="812"]')
      .should('be.visible')
      .type('081234567890')

    cy.get('textarea')
      .should('be.visible')
      .type('Alamat Testing Cypress')

    cy.contains('Simpan Data Pasien')
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/patients/create')
  })

  it('NCC-PAS-003 Edit Patient Data', () => {
    cy.visit('/admin/patients')

    cy.url()
      .should('include', '/admin/patients')

    cy.get('a[href*="/edit"]')
      .first()
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/edit')

    cy.get('input:visible')
      .then(($el) => {
        cy.log('Jumlah input visible: ' + $el.length)
      })

    cy.get('input:visible')
      .eq(2)
      .should('be.visible')
      .clear()
      .type('Patient Cypress Update')

    cy.contains('Simpan Data Pasien')
      .should('be.visible')
      .click()
  })

})