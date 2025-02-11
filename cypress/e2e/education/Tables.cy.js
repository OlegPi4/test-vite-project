describe("Testing Tables", () => {
  beforeEach("Login", () => {
    cy.visit("https://demo.opencart.com/admin/");
    cy.get("#input-username").type("demo");
    cy.get("#input-password").type("demo");
    cy.get('button[type="submit"]').click();
    // закрываем всплывающее окно с сообщением
    cy.get(".btn-close").click();
    // переходим в меню в пункт Customer
    cy.get("#menu-customer>a").click();
    // в открывшемся списке выбираем первый пункт
    cy.get("#menu-customer>ul>li:first-child").click();
  }); // получаем таблицу с пользователями c пагинацией  которую тестируем

  it("Check number Rows & Columns", () => {
    cy.get("table[class='table table-bordered table-hover']>tbody>tr").should(
      "have.length",
      "10"
    );
    cy.get(
      "table[class='table table-bordered table-hover']>thead>tr>td"
    ).should("have.length", "7");
  });

  it("Check cell data from specific Row & Rolumn", () => {
    // проверяем значение в 5 строке, 3- колонка
    cy.get(
      "table[class='table table-bordered table-hover']>tbody>tr:nth-child(5)>td:nth-child(3)"
    ).contains("rs@polymail.com");
  });

  it("Read all the rows & Collumns data in the first page", () => {
    cy.get("table[class='table table-bordered table-hover']>tbody>tr").each(
      ($row, index, $rows) => {
        cy.wrap($row).within(() => {
          cy.get("td").each(($col, index, $cols) => {
            cy.log($col.text());
          });
        });
      }
    );
  });

  it("Pagination", () => {
    // find total number of pages
    let totalPages;
    cy.get(".col-sm-6.text-end").then((e) => {
      //сообщение о текущих записях и общем количестве страниц (справа)
      let mytext = e.text(); // geted text
      // выделяем число страниц
      totalPages = mytext.substring(
        mytext.indexOf("(") + 1,
        mytext.indexOf("Pages") - 1
      );
      cy.log(`Total number of pages = ${totalPages}`);
    });
    for (let p = 1; p <= totalPages; p++) {
      if (totalPages > 1) {
        cy.log("Active page is  == " + p);
        cy.get("ul[class='pagination']>li:nth-child(" + p + ")").click();
        cy.wait(1000);

        cy.get("table[class='table table-bordered table-hover']>tbody>tr").each(
          ($row, index, $rows) => {
            cy.wrap($row).within(() => {
              cy.get("td:nth-child(3)").then((e) => {
                cy.log(e.text()); // Email
              });
            });
          }
        );
      }
    }
  });
});
