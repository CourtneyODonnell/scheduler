cy.contains(".appointment__card--show", "Lydia Miller-Jones");
cy.contains(".appointment__card--show", "Sylvia Palmer");
});
it("should edit an interview", () => {
 cy.get("[alt=Edit]")
   .first()
   .click({ force: true });

 cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
 cy.get("[alt='Tori Malcolm']").click();

 cy.contains("Save").click();

 cy.contains(".appointment__card--show", "Lydia Miller-Jones");
 cy.contains(".appointment__card--show", "Tori Malcolm");
});
});