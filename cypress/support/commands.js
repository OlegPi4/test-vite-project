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
/// <reference types="cypress-xpath" />
import "cypress-file-upload";

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
Cypress.Commands.add("loadLoginPageDesk", () => {
  cy.xpath("//header[1]/div[1]/div[2]/div[1]/div[2]/ul[1]/li[2]").as(
    "icon-user"
  );
  cy.get("@icon-user").click();
  cy.get("h1").should("be.visible").contains("Авторизація");
});

Cypress.Commands.add("loginUser", (email, password) => {
  cy.get('[name="email"]').type(email);
  cy.get('[name="password"]').type(password);
  cy.get('[name="email"]').should("have.value", email);
  cy.get('[name="password"]').should("have.value", password);
  cy.intercept("POST", "/user/login").as("login");
  cy.get('[type="submit"]').click();
  cy.wait("@login").its("response.statusCode").should("eq", 200);
  cy.location("pathname").should("eq", "/auth/profile");
  cy.get("header li svg circle").eq(1).as("icon-user");
  cy.get("@icon-user").should("have.attr", "fill");
});

Cypress.Commands.add("loginUserDesk", (email, password) => {
  cy.get('form[action="#"] input[name="email"]').eq(1).type(email);
  cy.get('form[action="#"] input[name="password"]').eq(1).type(password);

  cy.get('form[action="#"] input[name="email"]')
    .eq(1)
    .should("have.value", email);
  cy.get('form[action="#"] input[name="password"]')
    .eq(1)
    .should("have.value", password);
  cy.intercept("POST", "/user/login").as("login");
  cy.get('form[action="#"] button[type="submit"]').eq(1).click();
  cy.wait("@login").its("response.statusCode").should("eq", 200);
  cy.contains("Топ продажів");
  cy.get("header li svg circle").as("icon-user");
  cy.get("@icon-user").should("have.attr", "fill");
});

Cypress.Commands.add("clearInputCheck", (selector, id, data) => {
  cy.get(selector).eq(id).clear();

  cy.get(selector).then(($input) => {
    if (id == 3) {
      cy.get(":nth-child(4) > .label").type(data);
      cy.wrap($input).eq(id).should("have.value", `+380${data}`);
    } else {
      cy.get(selector).eq(id).type(data);
      cy.get(selector).eq(id).should("have.value", data.trim());
    }
  });
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
// Cypress.Commands.add("clickLink", (label) => {
//   cy.get("a").contains(label).click();
// });

// Cypress.Commands.overwrite(
//   "contains",
//   (originalFn, subject, filter, text, options = {}) => {
//     if (typeof text === "object") {
//       options = text;
//       text = filter;
//       filter = undefined;
//     }
//     options.matchCase = false;
//     return originalFn(subject, filter, text, options);
//   }
// );

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
