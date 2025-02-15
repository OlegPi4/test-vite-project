import Login from "../../PageObjects/LoginPage2.js";

describe("POM", () => {
  it("Login With POM + fixture", () => {
    cy.visit("/auth/login");
    cy.fixture("userSportStore").then((data) => {
      const log = new Login();
      log.setEmail(data.email);
      log.setPassword(data.password);
      log.clickSubmit();
      log.verifyLogin();
    });
  });
});
