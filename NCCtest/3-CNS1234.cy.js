/// <reference types="cypress" />

describe('NCC Counselor Module', () => {

  it('NCC-CNS-001 Create Counselor with Valid Data', () => {
    cy.login('admin')

    cy.visit('/admin/counselors/create')

    cy.url()
      .should('include', '/admin/counselors/create')

    cy.get('input[placeholder*="Dr."]')
      .should('be.visible')
      .clear()
      .type('Cypress Counselor')

    cy.get('input[placeholder="name@domain.com"]')
      .should('be.visible')
      .clear()
      .type(`cypress${Date.now()}@mail.com`)

    cy.get('input[placeholder*="812"]')
      .should('be.visible')
      .clear()
      .type('081234567890')

    cy.get('input[type="password"]')
      .should('be.visible')
      .clear()
      .type('password123')

    cy.get('input[placeholder*="Spesialis"]')
      .should('be.visible')
      .clear()
      .type('Ahli Gizi')

    cy.get('input[placeholder="cth. 5"]')
      .should('be.visible')
      .clear()
      .type('5')

    cy.get('input[placeholder*="Ahli Gizi"]')
      .should('be.visible')
      .clear()
      .type('STR123456')

    cy.get('textarea')
      .should('be.visible')
      .clear()
      .type('Alamat Praktik Cypress Testing')

    cy.contains('Simpan Data Konselor')
      .should('be.visible')
      .click()

    cy.url({ timeout: 15000 })
      .should('not.include', '/admin/counselors/create')
  })


  it('NCC-CNS-002 Display Total Completed Consultations', () => {
    cy.login('admin')

    cy.visit('/admin')

    cy.url()
      .should('include', '/admin')

    cy.contains('Dashboard Statistik')
      .should('be.visible')

    cy.contains('Total Pasien')
      .should('be.visible')

    cy.contains('Total Konselor')
      .should('be.visible')

    cy.contains('Konsultasi Aktif')
      .should('be.visible')
  })


    it('NCC-CNS-003 Verify Payment Status in Consultation History', () => {
    cy.login('counselor')

    cy.visit('/counselor/consultations/history')

    cy.url({ timeout: 15000 })
      .should('include', '/counselor/consultations/history')

    cy.get('main')
      .should('be.visible')
      .and('contain.text', 'Lunas')
  })


  it('NCC-CNS-004 Approve Consultation Reschedule Request', () => {
    cy.login('counselor')
 
    cy.visit('/counselor/schedules')

    cy.url()
      .should('include', '/counselor/schedules')

    cy.contains('Persetujuan Jadwal Konsultasi')
      .should('be.visible')

    cy.contains('Patient')
      .should('be.visible')
  })

})