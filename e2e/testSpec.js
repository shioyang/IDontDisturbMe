describe('pupup', function() {
	beforeEach(function() {
		browser.get('http://localhost:8080/popup.html');
	});

	it('should have 0', function() {
		expect(0).toEqual(0);
	});
});
