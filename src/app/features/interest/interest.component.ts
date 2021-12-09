import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { greaterThanValidator } from 'src/app/shared/validators/greater-than.validator';
import { Interest } from './models/interest.model';
import { InterestService } from './services/interest.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
})
export class InterestComponent implements OnInit {
  interest: Interest = new Interest();
  interestForm!: FormGroup;

  isSubmitted = false;
  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private interestService: InterestService
  ) {}

  ngOnInit(): void {
    this.interestForm = this.fb.group(
      {
        id: [''],
        presentValue: [0, [Validators.required]],
        lowerBoundInterestRate: [0, [Validators.required]],
        upperBoundInterestRate: [0, [Validators.required]],
        incrementalRate: [0, [Validators.required]],
        maturityYears: [0, [Validators.required]],
      },
      {
        validators: [
          greaterThanValidator(
            'lowerBoundInterestRate',
            'upperBoundInterestRate'
          ),
        ],
        updateOn: 'blur',
      }
    );

    // const id = Number(this.route.snapshot.paramMap.get('id')!);

    this.interestService
      .getInterest(1)
      .subscribe((res) => this.interestForm.patchValue(res))
      .add(() => (this.isLoading = false));

    this.interestForm.valueChanges.subscribe(() => {
      Object.assign(this.interest, this.interestForm.value);
      this.interest.calculateInterest();
    });
  }

  //#region Getters
  get presentValue() {
    return this.interestForm.controls['presentValue'];
  }

  get lowerBoundInterestRate() {
    return this.interestForm.controls['lowerBoundInterestRate'];
  }

  get upperBoundInterestRate() {
    return this.interestForm.controls['upperBoundInterestRate'];
  }

  get incrementalRate() {
    return this.interestForm.controls['incrementalRate'];
  }

  get maturityYears() {
    return this.interestForm.controls['maturityYears'];
  }
  //#endregion Getters

  onSubmit(): void {
    this.isLoading = true;
    this.isSubmitted = false;

    if (this.interestForm.invalid) {
      this.isLoading = false;
      this.isSubmitted = true;
      return;
    }

    this.interestService
      .editInterest(this.interest)
      .subscribe((res) => this.interestForm.patchValue(res))
      .add(() => {
        this.isLoading = false;
        this.isSubmitted = true;
      });
  }
}
