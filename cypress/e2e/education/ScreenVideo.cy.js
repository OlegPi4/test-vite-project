describe("Screenshot & Video", () => {
  it("Capture screenshote & Video", () => {
    cy.visit("https://the-internet.herokuapp.com/iframe");
    cy.screenshot("iframe");
    cy.get("h3").screenshot("message-block");
  });
});
