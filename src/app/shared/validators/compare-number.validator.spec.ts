import {
  CompareNumberEnum,
  compareNumberValidator,
} from './compare-number.validator';

describe('compareNumberValidator', () => {
  it('should create an instance', () => {
    expect(
      compareNumberValidator('field1', 'field2', CompareNumberEnum.equal)
    ).toBeTruthy();
  });
});
