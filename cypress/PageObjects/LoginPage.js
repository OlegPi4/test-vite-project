class Login {
  setEmail(email) {
    cy.get(":nth-child(1) > .label").type(email);
  }
  setPassword(password) {
    cy.get(":nth-child(2) > .label").type(password);
  }
  clickSubmit() {
    cy.get('button[type="submit"]').click();
  }
  verifyLogin(path) {
    cy.wait(1000);
    cy.url().should("include", path);
  }
}
export default Login;
