import { InterestDetails } from './interest-details.model';

export class Interest {
  public id: number = 0;
  public interestDetails: InterestDetails[] = [];

  public presentValue: number = 0;
  public lowerBoundInterestRate: number = 0;
  public upperBoundInterestRate: number = 0;
  public incrementalRate: number = 0;
  public maturityYears: number = 0;

  public userId: number = 0;

  constructor() {
    this.calculateInterest.bind(this);
  }

  // //#region Getters
  // get presentValue(): number {
  //   return this._presentValue;
  // }

  // get lowerBoundInterestRate(): number {
  //   return this._lowerBoundInterestRate;
  // }

  // get upperBoundInterestRate(): number {
  //   return this._upperBoundInterestRate;
  // }

  // get incrementalRate(): number {
  //   return this._incrementalRate;
  // }

  // get maturityYears(): number {
  //   return this._maturityYears;
  // }
  // //#endregion Getters

  // //#region Setters
  // set presentValue(value: number) {
  //   this._presentValue = value;

  //   this.calculateInterest();
  // }

  // set lowerBoundInterestRate(value: number) {
  //   this._lowerBoundInterestRate = value;

  //   this.calculateInterest();
  // }

  // set upperBoundInterestRate(value: number) {
  //   this._upperBoundInterestRate = value;

  //   this.calculateInterest();
  // }

  // set incrementalRate(value: number) {
  //   this._incrementalRate = value;

  //   this.calculateInterest();
  // }

  // set maturityYears(value: number) {
  //   this._maturityYears = value;

  //   this.calculateInterest();
  // }
  // //#endregion Setters

  calculateInterest(): void {
    this.interestDetails = [];

    let currentValue = this.presentValue;
    let currentRate = this.lowerBoundInterestRate;

    if (
      this.lowerBoundInterestRate > this.upperBoundInterestRate ||
      Object.values(this).some((value) => value === null)
    )
      return;

    for (let x = 1; x <= this.maturityYears; x++) {
      var detail = new InterestDetails(currentValue, currentRate, undefined, x);

      var futureRate = currentRate + this.incrementalRate;

      // Add incremental rate to current rate
      if (futureRate <= this.upperBoundInterestRate) currentRate = futureRate;
      // Max out rate to upper bound
      else currentRate = this.upperBoundInterestRate;

      currentValue = detail.futureValue;
      this.interestDetails.push(detail);
    }
  }
}
