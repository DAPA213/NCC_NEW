/// <reference types="cypress" />

describe('NCC UAT Test Cases', () => {

  it('NCC-FIN-001 - Filter Financial Report by Date Range', () => {
    cy.login('admin')

    cy.visit('/admin/reports/financial')

    cy.url()
      .should('include', '/admin/reports/financial')

    cy.contains('Laporan Keuangan')
      .should('exist')

    cy.get('input[type="date"]')
      .should('have.length.at.least', 2)

    cy.get('input[type="date"]')
      .eq(0)
      .clear()
      .type('2026-08-01')

    cy.get('input[type="date"]')
      .eq(1)
      .clear()
      .type('2026-08-31')

    cy.contains('button', 'Filter')
      .should('exist')
      .click()

    cy.url()
      .should('include', 'start_date=2026-08-01')
      .and('include', 'end_date=2026-08-31')
  })


  it('NCC-PAY-001 - Redirect to Payment Method', () => {
    cy.login('patient')
    cy.visit('/patient/dashboard')

    // Buka sidebar
    cy.get('#openSidebarBtn').click()

    // Klik Beli Paket di sidebar
    cy.contains('Beli Paket')
      .should('be.visible')
      .click()

    cy.contains('Pilih Paket Ini')
      .first()
      .should('be.visible')
      .click()

    cy.contains('Ya, Lanjutkan')
      .should('be.visible')
      .click()

    cy.get('select:visible')
      .first()
      .select(1)

    cy.get('input[type="datetime-local"]:visible')
      .first()
      .type('2026-09-08T15:00')

    cy.contains('Daftar & Lanjut Pembayaran')
      .should('be.visible')
      .click()

    cy.url()
      .should('include', 'checkout-staging.xendit.co')
  })


  it('NCC-NLK-001 - Access Transfer Recording Form', () => {
    cy.login('admin')

    cy.visit('/admin/reports/nlk-reconciliation')

    cy.url()
      .should('include', '/admin/reports/nlk-reconciliation')

    cy.contains(/Rekam Transfer ke NLK/i)
      .should('exist')
      .click()

    cy.contains('Rekam Transfer Baru')
      .should('exist')

    cy.contains('Jumlah Transfer (Rp)')
      .should('exist')

    cy.contains('Tanggal Transfer')
      .should('exist')

    cy.contains('Bukti Transfer')
      .should('exist')

    cy.contains('Catatan Tambahan')
      .should('exist')

    cy.contains('Simpan Rekaman')
      .should('exist')

    cy.contains('Batal')
      .should('exist')
  })


  it('NCC-DAS-003 - Verify Dashboard Responsiveness', () => {
    cy.login('admin')

    cy.visit('/admin')

    cy.url()
      .should('include', '/admin')

    cy.viewport(1366, 768)

    cy.contains('Dashboard')
      .should('exist')

    cy.viewport(375, 667)

    cy.contains('Dashboard')
      .should('exist')

    cy.viewport(1920, 1080)

    cy.contains('Dashboard')
      .should('exist')
  })


  it('NCC-CNS-HIS-001 - Access Counselor Performance Log', () => {
    cy.login('admin')

    cy.visit('/admin/reports/counselor')

    cy.url()
      .should('include', '/admin/reports/counselor')

    cy.contains('Kinerja Konselor')
      .should('exist')

    cy.contains(/Total Pasien/i)
      .should('exist')

    cy.contains(/Revenue/i)
      .should('exist')

    cy.contains('Lihat Log')
      .first()
      .should('exist')
      .click()

    cy.contains(/Riwayat|Log/i)
      .should('exist')
  })


  it('NCC-CTC-001 - Send Contact Message', () => {
    cy.visit('/')

    cy.contains('Hubungi Kami')
      .should('exist')
      .click()

    cy.get('input[placeholder="Masukkan nama Anda"]')
      .should('exist')
      .clear()
      .type('Cypress Test User')

    cy.get('input[placeholder="name@domain.com"]')
      .should('exist')
      .clear()
      .type(`cypress${Date.now()}@mail.com`)

    cy.get('textarea[placeholder="Bagaimana kami bisa membantu?"]')
      .should('exist')
      .clear()
      .type('Pesan test dari Cypress')

    cy.contains('Kirim Pesan')
      .should('exist')
      .click()
  })


  it('NCC-CONS-001 - Click Mulai Konsultasi Before Login', () => {
    cy.visit('/')

    cy.contains(/Mulai Konsultasi/i)
      .should('exist')
      .click()

    cy.url()
      .should('include', '/login')

    cy.get('input[type="email"]')
      .should('exist')

    cy.get('input[type="password"]')
      .should('exist')
  })

    it('NCC-LOGOUT-001 - Logout from System', () => {
    cy.login('admin')
    cy.visit('/admin')

    cy.get('#openSidebarBtn').click()

    cy.get('button[title="Keluar"]').click()

    cy.contains('Konfirmasi Keluar')
      .should('be.visible')

    cy.contains('button', 'Ya, Keluar')
      .should('be.visible')
      .click()

    cy.url()
      .should('eq', `${Cypress.config('baseUrl')}/`)
  })
})  