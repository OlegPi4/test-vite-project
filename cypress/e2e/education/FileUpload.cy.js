describe("File Upload", () => {
  it("Single file upload", () => {
    cy.visit("http://the-internet.herokuapp.com/upload");
    cy.get("#file-upload").attachFile("isics.jpg");
    cy.get("#file-submit").click();
    cy.wait(2000);
    cy.get('div[class="example"] h3').should("have.text", "File Uploaded!");
  });

  it("Single File Upload & Rename", () => {
    cy.visit("http://the-internet.herokuapp.com/upload");
    cy.get("input#file-upload").attachFile({
      filePath: "isics.jpg",
      fileName: "newname.jpg",
    });
    cy.get("#file-submit").click();
    cy.wait(2000);
    cy.get('div[class="example"] h3').should("have.text", "File Uploaded!");
    cy.get("#uploaded-files").should("contain", "newname.jpg");
  });

  it("File Upload Drug&Drop", () => {
    cy.visit("http://the-internet.herokuapp.com/upload");
    cy.get("#drag-drop-upload").attachFile("obraz.jpg", {
      subjectType: "drag-n-drop",
    });
    cy.wait(2000);
    cy.get(
      "#drag-drop-upload > .dz-preview > .dz-details > .dz-filename > span"
    ).contains("obraz.jpg");
  });
  it("Multiple Files Upload", () => {
    cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php");
    cy.get("#filesToUpload").attachFile(["isics.jpg", "obraz.jpg"]);
    cy.wait(2000);
    cy.get("#fileList > :nth-child(1)").should("contain.text", "isics.jpg");
    cy.get("#fileList > :nth-child(2)").should("contain.text", "obraz.jpg");
  });
  it.only("File upload - Shadow Dom", () => {
    cy.visit(
      "https://www.htmlelement.com/demos/fileupload/shadow-dom/index.htm"
    );
    // Элемент input  находится внутри #shadow-root
    cy.get(".smart-browse-input", { includeShadowDom: true }).attachFile(
      "obraz.jpg"
    );
    cy.wait(2000);
    cy.get(".smart-item-name", { includeShadowDom: true }).contains(
      "obraz.jpg"
    );
  });
});
