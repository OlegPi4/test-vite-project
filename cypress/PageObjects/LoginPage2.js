class Login {
  txtEmail = ":nth-child(1) > .label";
  txtPassword = ":nth-child(2) > .label";
  btnSubmit = 'button[type="submit"]';
  path = "/auth/profile";
  setEmail(email) {
    cy.get(this.txtEmail).type(email);
  }
  setPassword(password) {
    cy.get(this.txtPassword).type(password);
  }
  clickSubmit() {
    cy.get(this.btnSubmit).click();
  }
  verifyLogin(path) {
    cy.wait(1000);
    cy.url().should("include", this.path);
  }
}
export default Login;
