describe("Use Fixture", () => {
  // fixture for single it block
  it("Direct access", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.fixture("Access1").then((data) => {
      cy.get('input[placeholder="Username"]').type(data.username);
      cy.get('input[placeholder="Password"]').type(data.password);
      cy.get('button[type="submit"]').click();
      cy.get(":nth-child(2) > .oxd-main-menu-item").should(
        "have.text",
        data.expected
      );
    });
  });

  it("Multiple Direct Access", () => {
    cy.fixture("Access2").then((data) => {
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );
      data.forEach((item) => {
        cy.get('input[placeholder="Username"]').type(item.username);
        cy.get('input[placeholder="Password"]').type(item.password);
        cy.get('button[type="submit"]').click();
        if (item.username == "Admin" && item.password == "admin123") {
          cy.get(":nth-child(2) >.oxd-main-menu-item").should(
            "have.text",
            item.expected
          );
          cy.get(".oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon").click();

          cy.get("a[href$='/web/index.php/auth/logout']").click();
          cy.wait(3000);
        } else {
          cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should(
            "have.text",
            "item.expected"
          );
        }
      });
    });
  });
});
