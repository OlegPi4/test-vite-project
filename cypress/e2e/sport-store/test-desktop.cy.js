import { sizes, user, setSuccessSignup } from "../../data-test/data";

const mainPagePath = "/";
describe("Desktop v. Module authentication ", () => {
  beforeEach(() => {
    cy.viewport(sizes[0]);
    cy.loadMainPage(mainPagePath);

    cy.get("header li svg").eq(1).as("icon-user");
    cy.get("@icon-user").should("not.have", "circle");
    cy.get("header li").eq(1).click();
    cy.url().should("include", "/auth/login");
  });
  it("Login with correct credentials", () => {
    cy.get("input").should("have.length").eq(2);
  });
});
