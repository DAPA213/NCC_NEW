/// <reference types="cypress" />

describe('NCC Riwayat dan Persetujuan Jadwal', () => {

  beforeEach(() => {
    cy.login('admin')
  })

  function bukaSidebar() {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()
  }

  it('NCC-TAB-001 - Verify Navigation to Riwayat Konsultasi Tab', () => {
    bukaSidebar()

    cy.contains('Riwayat Medis Pasien')
      .scrollIntoView()
      .click()

    cy.contains('Riwayat Konsultasi')
      .click()

    cy.url()
      .should('include', '/admin/consultations?tab=consultation')

    cy.contains('Riwayat Konsultasi').should('exist')
    cy.contains('Aksi').should('exist')
  })

  it('NCC-TAB-002 - Verify Navigation to Riwayat Asesmen Tab', () => {
    bukaSidebar()

    cy.contains('Riwayat Medis Pasien')
      .scrollIntoView()
      .click()

    cy.contains('Riwayat Asesmen')
      .click()

    cy.contains('Riwayat Asesmen').should('exist')
  })

  it('NCC-TAB-003 - Verify Switching Between Tabs', () => {
    bukaSidebar()

    cy.contains('Riwayat Medis Pasien')
      .scrollIntoView()
      .click()

    cy.contains('Riwayat Konsultasi').click()
    cy.contains('Riwayat Konsultasi').should('exist')

    cy.contains('Riwayat Asesmen').click()
    cy.contains('Riwayat Asesmen').should('exist')

    cy.contains('Riwayat Konsultasi').click()
    cy.contains('Riwayat Konsultasi').should('exist')
  })

  it('NCC-SCH-001 - Verify Assessment Schedule Approval List Display', () => {
    bukaSidebar()

    cy.contains('Persetujuan Jadwal')
      .scrollIntoView()
      .click()

    cy.contains('Persetujuan Jadwal Asesmen').should('exist')
    cy.contains('Pasien').should('exist')
    cy.contains('Reschedule').should('exist')
    cy.contains('Setujui').should('exist')
  })

  it('NCC-SCH-002 - Approve Assessment Schedule Request', () => {
    bukaSidebar()

    cy.contains('Persetujuan Jadwal')
      .scrollIntoView()
      .click()

    cy.contains('Setujui')
      .first()
      .scrollIntoView()
      .click()

    cy.url().should('include', '/schedules')
  })

  it('NCC-SCH-003 - Reschedule Assessment Schedule Request', () => {
    bukaSidebar()

    cy.contains('Persetujuan Jadwal')
      .scrollIntoView()
      .click()

    cy.contains('Reschedule')
      .first()
      .scrollIntoView()
      .click()

    cy.contains(/Reschedule|Jadwal/i)
      .should('exist')
  })

  it('NCC-SCH-004 - Verify Patient Information Display in Schedule Approval List', () => {
    bukaSidebar()

    cy.contains('Persetujuan Jadwal')
      .scrollIntoView()
      .click()

    cy.url().should('include', '/schedules')

    cy.get('table').should('exist')
    cy.get('tbody tr')
      .should('have.length.at.least', 1)
  })

})