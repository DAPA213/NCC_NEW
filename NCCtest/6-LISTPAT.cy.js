/// <reference types="cypress" />

describe('NCC Counselor & Patient Dashboard', () => {

  it('NCC-CNS-LIST-001 - View Counselor List on Landing Page', () => {
    cy.visit('/')

    cy.contains('Bekerja dengan ahli gizi terbaik')
      .scrollIntoView()
      .should('exist')
  })

  it('NCC-CNS-LIST-002 - Navigate Counselor Slider', () => {
    cy.visit('/')

    cy.contains('Bekerja dengan ahli gizi terbaik')
      .scrollIntoView()
      .should('exist')

    cy.get('button')
      .then(($buttons) => {
        const sliderButton = [...$buttons].find((button) => {
          const label = (
            button.getAttribute('aria-label') ||
            button.innerText ||
            ''
          ).toLowerCase()

          return (
            label.includes('next') ||
            label.includes('prev') ||
            label.includes('kanan') ||
            label.includes('kiri')
          )
        })

        expect(sliderButton, 'tombol slider').to.exist

        cy.wrap(sliderButton)
          .click()
      })
  })

  describe('Patient Dashboard', () => {

    beforeEach(() => {
      cy.login('patient')
    })

    it('NCC-DAS-PAT-001 - View Patient Dashboard', () => {
      cy.url()
        .should('not.include', '/login')

      cy.get('body')
        .should('contain.text', 'Dashboard')
    })


    it('NCC-DAS-PAT-002 - View InBody Trend Chart', () => {
      cy.get('body')
        .should('contain.text', 'Tren Score Inbody')
    })

    it('NCC-DAS-PAT-003 - View Latest Nutrition Summary', () => {
      cy.get('body')
        .should('contain.text', 'Ringkasan Gizi Terakhir')
        .and('contain.text', 'Target Kalori')
        .and('contain.text', 'Jenis Diet')
        .and('contain.text', 'Berat Badan')
    })

    it('NCC-DAS-PAT-004 - View Consultation History', () => {
      cy.get('body')
        .should('contain.text', 'Riwayat Konsultasi Anda')
    })

    it('NCC-DAS-PAT-005 - View Consultation Detail', () => {
      cy.contains('Detail')
        .first()
        .click()

      cy.url()
        .should('not.include', '/login')
    })

  })

})