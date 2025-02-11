describe("Use Assertions", () => {
  beforeEach(() => {
    //cy.visit("/auth/login");
  });
  it("Implicite assertions - demo", () => {
    // should  and
    cy.url().should("include", "/auth/login");
    cy.url().should("eq", "http://localhost:3000/auth/login");
    cy.url().should("contain", "auth");

    // chain assertions
    cy.url()
      .should("include", "/auth/login")
      .should("eq", "http://localhost:3000/auth/login")
      .should("contain", "auth");
    cy.url()
      .should("include", "/auth/login")
      .and("eq", "http://localhost:3000/auth/login")
      .and("contain", "auth")
      .and("not.eq", "http://localhost:3000/");
    // смотрим на тег title
    //cy.title().should("contain", "");
    // проверка существования и доступности элемента
    cy.get(".border-none > img").should("be.visible").and("exist");

    // проверка количества элементов на странице (линки  - form)
    cy.xpath("//form").should("have.length", 1);
  });

  it.only("Explicit assertions - demo", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/auth/login");

    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    let expName = "Ankit";
    cy.get(".oxd-userdropdown-name").then((x) => {
      let actName = x.text();

      //BDD style
      expect(actName).to.include(expName);
      expect(actName).to.not.include(expName);

      //TDD style
      assert.include(actName, expName);
      assert.notInclude(actName, expName);
    });
  });
});
