/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display loginpage when name, email and password are correct
 */

describe('register spec', () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register")
  })

  it("should display register page correctly", () => {
    // memverifikasi elemen yang harus tampak pada halaman register
    cy.get('input[placeholder="Input Name"]').should("be.visible");
    cy.get('input[placeholder="Input Email"]').should("be.visible");
    cy.get('input[placeholder="Input Password"]').should("be.visible");
    cy.get("button").contains(/^Register$/).should("be.visible");
  });

  it("should display alert when name is empty", () => {
    // klik tombol register tanpa mengisi name
    cy.get("button").contains(/^Register$/).click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    // mengisi name
    cy.get('input[placeholder="Input Name"]').type("Muhammad Arif");

    // klik tombol register tanpa mengisi email
    cy.get("button")
      .contains(/^Register$/)
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  })

  it('should display alert password email is empty', () => {
    // mengisi name
    cy.get('input[placeholder="Input Name"]').type("Muhammad Arif");

    // mengisi email
    cy.get('input[placeholder="Input Email"]').type("example@example.com");

    // klik tombol register tanpa mengisi password
    cy.get("button")
      .contains(/^Register$/)
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  })

  it('should display loginpage when name, email and password are correct', () => {
    // Intercept permintaan POST ke /register dan kembalikan respon palsu (mock)
    cy.intercept("POST", "**/register", {
      statusCode: 200,
      body: {
        success: true,
        message: "User registered successfully",
      },
    }).as("mockRegister");

    // mengisi name
    cy.get('input[placeholder="Input Name"]').type("Muhammad Arif");

    // mengisi email
    cy.get('input[placeholder="Input Email"]').type(`user${Date.now()}@test.com`);

    // mengisi password
    cy.get('input[placeholder="Input Password"]').type("123456");

    // klik tombol register
    cy.get("button")
      .contains(/^Register$/)
      .click();
      
      cy.wait("@mockRegister");

      cy.url().should("include", "http://localhost:5173/");

      // memverifikasi bahwa elemen yang berada di homepage ditampilkan
      cy.get('header').contains(/^Forum Dicoding$/).should('be.visible');
  })
})