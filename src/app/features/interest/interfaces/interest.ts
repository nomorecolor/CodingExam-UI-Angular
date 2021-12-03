export interface Interest {
  id: number;
  presentValue: number;
  lowerBoundInterestRate: number;
  upperBoundInterestRate: number;
  incrementalRate: number;
  maturityYears: number;
  interestDetails: InterestDetails[];
}

export interface InterestDetails {
  id: number;
  year: number;
  presentValue: number;
  interestRate: number;
  futureValue: number;
}
