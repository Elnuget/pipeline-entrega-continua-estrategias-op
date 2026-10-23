describe('Core API Health Tests', () => {
  it('should return UP on /health', () => {
    cy.request('http://localhost:3000/health').its('status').should('equal', 200);
  });
});
