describe("Navigation", () => {
  it("Test Navigation", () => {
    cy.visit("https://demo.opencart.com/");
    cy.title().should("have.value", "Your Store"); //Home page

    cy.get("li:nth-child(7) > a:nth-child(1)").click();
    cy.get('div[id="content"] h2').should("have.value", "Cameras"); // Cameras page
    cy.go("back"); // go back to home
    //cy.go('-1')
    cy.title().should("have.value", "Your Store");

    cy.go("forward"); // go Cameras page
    // cy.go('1')
    cy.get('div[id="content"] h2').should("have.value", "Cameras");

    cy.reload(); // перезагрузка страницы
  });
});
