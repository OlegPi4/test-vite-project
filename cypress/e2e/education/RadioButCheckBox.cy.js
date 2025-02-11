describe("Check UI Elements", () => {
  beforeEach(() => {
    cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
  });

  it("Checking Radio Buttons", () => {
    // проверяем видимость элемента
    cy.get("input[value='male']").should("be.visible");
    cy.get("input[value='female']").should("be.visible");
    cy.get("input[value='other']").should("be.visible");

    // выбор радиокнопки с проверкой
    cy.get("input[value='male']").check().should("be.checked");
    cy.get("input[value='female']").should("not.be.checked");
    cy.get("input[value='other']").should("not.be.checked");

    cy.get("input[value='female']").check().should("be.checked");
    cy.get("input[value='male']").should("not.be.checked");
    cy.get("input[value='other']").should("not.be.checked");

    cy.get("input[value='other']").check().should("be.checked");
    cy.get("input[value='female']").should("not.be.checked");
    cy.get("input[value='male']").should("not.be.checked");
  });

  it.only("Checking Check-Boxess", () => {
    // проверяем видимость элемента
    cy.get("input[value='Bike']").should("be.visible");

    // выбор одной радиокнопки с проверкой
    cy.get("input[value='Bike']").check().as("checkedBike");
    cy.get("@checkedBike").should("be.checked");

    // снимаем выбор одной радиокнопки с проверкой
    cy.get("input[value='Bike']").uncheck().should("not.be.checked");

    // проверка и выбор всех чек боксов
    cy.get("input[type='checkbox']").should("be.visible");
    cy.get("input[type='checkbox']").check().should("be.checked");
    cy.get("input[type='checkbox']").uncheck().should("not.be.checked");

    // выбор первого и последнего чек-бокса
    cy.get("input[type='checkbox']").first().check();
    cy.get("input[type='checkbox']").last().check();
  });
});
