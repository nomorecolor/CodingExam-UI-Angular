export class InterestDetails {
  constructor(
    public presentValue: number,
    public interestRate: number,
    public id: number = 0,
    public year: number = 0
  ) {}

  get futureValue() {
    return this.presentValue * (1 + this.interestRate / 100);
  }
}
