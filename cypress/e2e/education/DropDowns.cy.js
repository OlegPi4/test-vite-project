describe("Test dropdawns", () => {
  it("Dropdown with select", () => {
    cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
    cy.get("select").select("Saab").should("have.value", "Saab");
  });

  it("Dropdown without select", () => {
    cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/");
    cy.get("#select2-billing_country-container").click();
    cy.get(".select2-search__field").type("Italy{enter}");
    cy.get("#select2-billing_country-container").should("have.text", "Italy");
  });

  it("Auto suggest dropdown", () => {
    cy.visit("https://www.wikipedia.org/");
    cy.get("#searchInput").type("Kyiv");
    cy.get(".suggestion-title").contains("Kyiv Boryspil").click();
  });

  it.only("Dynamic dropdown", () => {
    cy.visit("https://www.google.com.ua/");
    cy.get(".gLFyf").type("cypress automation");
    cy.wait(1000);
    cy.get("div.wM6W7d>span").should("have.length.gte", 5);
    cy.get("div.wM6W7d>span").each(($el, index, $list) => {
      if ($el.text() == "cypress automation jobs") {
        cy.wrap($el).click();
      }
    });
    cy.get(".gLFyf").should("have.have.value", "cypress automation jobs");
  });
});
