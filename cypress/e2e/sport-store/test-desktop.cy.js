import { sizes, user, setSuccessSignup } from "../../data-test/data";

const mainPagePath = "/";
describe("Desktop v. Module authentication ", () => {
  beforeEach(() => {
    cy.viewport(sizes[0]);
    cy.loadMainPage(mainPagePath);
  });
  it("TC01-R-002 Successful user authentication", () => {
    cy.loadLoginPageDesk();
    cy.loginUserDesk(user.email, user.password);
    cy.xpath("//header[1]/div[1]/div[2]/div[1]/div[2]/ul[1]/li[2]").as(
      "icon-user"
    );
    cy.get("@icon-user").click();
    cy.get("a").contains("Мої данні");
    cy.intercept("POST", "/user/logout").as("logout");
    cy.get("li").contains("Вийти").click();
    cy.wait("@logout").its("response.statusCode").should("eq", 200);
    cy.xpath("//header[1]/div[1]/div[2]/div[1]/div[2]/ul[1]/li[2]").as(
      "icon-user"
    );
    cy.get("@icon-user").click();
    cy.get('form[action="#"]').contains("Увійти");
  });
});
