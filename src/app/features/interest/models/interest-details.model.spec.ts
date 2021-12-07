import { InterestDetails } from './interest-details.model';

describe('InterestDetail', () => {
  it('should create an instance', () => {
    expect(new InterestDetails(0, 0)).toBeTruthy();
  });
});
