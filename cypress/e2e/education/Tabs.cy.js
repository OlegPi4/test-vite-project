describe("Hendle Tabs", () => {
  it("Aproach 1", () => {
    cy.visit("https://the-internet.herokuapp.com/windows"); // parent tab
    // remove attr target & click
    cy.get(".example >a").invoke("removeAttr", "target").click();
    // assertion
    cy.url().should(
      "include",
      "https://the-internet.herokuapp.com/windows/new"
    );
    cy.wait(1000);
    cy.go("back"); // back to parent tab
  });

  it.only("Aproach 2", () => {
    cy.visit("https://the-internet.herokuapp.com/windows");
    cy.get(".example >a").then((e) => {
      let url = e.prop("href");
      cy.visit(url);
    });
    cy.url().should(
      "include",
      "https://the-internet.herokuapp.com/windows/new"
    );
    cy.wait(1000);
    cy.go("back"); // back to parent tab
  });
});
