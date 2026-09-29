/// <reference types="cypress" />

describe('NCC Officer Module', () => {

  beforeEach(() => {
    cy.login('officer')
  })

  it('NCC-OFC-DASH-001 - View Dashboard Summary', () => {
    cy.get('body')
      .should('contain.text', 'Total Pasien')
      .and('contain.text', 'Total Konselor')
      .and('contain.text', 'Konsultasi')
  })

  it('NCC-OFC-DASH-002 - View Latest Registration', () => {
    cy.get('body')
      .should('contain.text', 'Pendaftaran')
  })

  it('NCC-OFC-DASH-003 - Verify Officer Access to Consultation List', () => {
    cy.contains('Lihat Semua Konsultasi')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('not.include', '/login')
  })

  it('NCC-OFC-CON-001 - Fill Consultation Registration as Officer', () => {
      cy.get('#openSidebarBtn')
        .should('be.visible')
        .click()

      cy.contains('Pendaftaran Baru')
        .should('be.visible')
        .click()

      cy.contains('Pilih Paket')
        .first()
        .should('be.visible')
        .click()

      cy.contains('Ya, Lanjutkan')
        .should('be.visible')
        .click()

      cy.url()
        .should('include', '/consultations/create')

      cy.contains('Pendaftaran Konsultasi Baru')
        .should('exist')

      cy.get('select:visible')
        .eq(0)
        .select(1)

      cy.get('select:visible')
        .eq(1)
        .select(1)

      cy.get('input[type="datetime-local"]:visible')
        .type('2026-09-10T09:00')

      cy.contains('Simpan Pendaftaran')
        .should('be.visible')
        .click()

      cy.url()
        .should('not.include', '/consultations/create')

      cy.get('body')
        .should('contain.text', 'Konsultasi')
    })


})

describe('NCC Navigation Module', () => {

  it('NCC-HOME-BTN-001 - Verify Pelajari Selengkapnya Navigation', () => {
    cy.visit('/')

    cy.contains('Pelajari Selengkapnya')
      .should('exist')
      .click()

    cy.url()
      .should('include', 'ncc.vkes.co.id')
  })

  it('NCC-REG-LINK-001 - Verify Login Link Navigation', () => {
    cy.visit('/register')

    cy.contains('Masuk')
      .should('exist')
      .click()

    cy.url()
      .should('include', '/login')
  })

})

describe('NCC Admin Search Module', () => {

  beforeEach(() => {
    cy.login('admin')
  })

  it('NCC-SRCH-001 - Verify Search Functionality', () => {
    cy.visit('/admin/counselors')

    cy.get('input[type="search"], input[placeholder*="Cari"]')
      .filter(':visible')
      .first()
      .should('exist')
      .type('Counselor1')

    cy.get('body')
      .should('contain.text', 'Counselor')
  })

})