// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("loadMainPage", (path) => {
  cy.intercept("GET", path).as("main-page");
  cy.visit(path);
  cy.wait("@main-page");
});
Cypress.Commands.add("loadLoginPage", () => {
  cy.get("header li svg").eq(1).as("icon-user");
  cy.get("@icon-user").should("not.have", "circle");
  cy.get("header li").eq(1).click();
  cy.url().should("include", "/auth/login");
});

Cypress.Commands.add("login", (email, password) => {
  cy.session(email, () => {
    cy.visit("/auth/login");
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(`${password}{enter}`, { log: false });
    cy.url().should("include", "/auth/profile");
    cy.contains("Вийти");
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
