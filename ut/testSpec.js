describe('Hello UT', function() {
	it('To be success', function() {
		expect(1).toBe(1);
	});
//	it('To be fail', function() {
//		expect(0).toBe(1);
//	});
});

describe('Hello Directive', function() {
	var $compile;
	var $rootScope;
	beforeEach(module('popupApp'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('Compile tabs directive', function() {
		var element = $compile("<tabs></tabs>")($rootScope);
//		$rootScope.$digest();
//		expect(element.html()).toContain("...");
	});
});
