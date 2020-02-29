import * as testData from "../../testData/testData";

context("Tab Handling Anchor Links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  testData.productsBtn.forEach(data => {
    describe(`testing the target=/${data.name} link`, () => {
      it("verify the href", () => {
        cy.contains(`${data.name}`).should($a => {
          data.visible ? expect($a).to.be.visible : expect($a).to.be.hidden;

          expect($a).to.have.prop("href");
          expect($a.prop("href")).eq(`${data.link}`);
        });
      });

      it("request without visiting", () => {
        cy.contains(`${data.name}`).then($a => {
          const href = $a.prop("href");

          cy.request(href).then(resp => {
            expect(resp.status).to.eq(200);

            expect(resp.body).to.include(`${data.title}`);
            expect(resp.body).to.include(`${data.text}`);
          });
        });
      });
    });
  });
});
