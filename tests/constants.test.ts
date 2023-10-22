import { ArabicServices } from '../dist';

describe('STANDARD_LETTERS', () => {
	it('should have array length of 34', () => {
		expect(Object.keys(ArabicServices.constants.STANDARD_LETTERS).length).toBe(34);
	});
});
