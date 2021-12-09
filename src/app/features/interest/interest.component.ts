import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertService,
  AuthService,
  TokenService,
} from 'src/app/shared/services';
import {
  CompareNumberEnum,
  compareNumberValidator,
} from 'src/app/shared/validators/compare-number.validator';
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

  id: number = 0;

  isSubmitted = false;
  isLoading = true;

  noData = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private interestService: InterestService,
    private alertService: AlertService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.interestForm = this.fb.group(
      {
        id: [0],
        presentValue: [0, [Validators.required]],
        lowerBoundInterestRate: [0, [Validators.required]],
        upperBoundInterestRate: [0, [Validators.required]],
        incrementalRate: [0, [Validators.required]],
        maturityYears: [0, [Validators.required]],
        userId: [0],
      },
      {
        validators: [
          compareNumberValidator(
            'lowerBoundInterestRate',
            'upperBoundInterestRate',
            CompareNumberEnum.lessThanEqual
          ),
        ],
        updateOn: 'blur',
      }
    );

    this.id = this.tokenService.getToken()!.currentUser.id;

    this.interestService
      .getInterest(this.id)
      .subscribe({
        next: (res) => this.interestForm.patchValue(res),
        error: (err: HttpErrorResponse) => {
          if (err.status === 400)
            this.alertService.error().then(() => {
              this.tokenService.clearToken();
              this.router.navigate(['/']);
            });

          if (err.status === 404) this.noData = true;
        },
      })
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

    if (this.noData) {
      this.interest.userId = this.id;

      this.interestService
        .addInterest(this.interest)
        .subscribe({
          next: (res) => {
            this.interestForm.patchValue(res);
            this.noData = false;
          },
          error: (err: HttpErrorResponse) => {
            if (err.error?.errors) {
              this.alertService.error(
                undefined,
                err.error.errors[Object.keys(err.error.errors)[0]][0]
              );
            } else if (err.error) this.alertService.error(undefined, err.error);
          },
        })
        .add(() => {
          this.isLoading = false;
          this.isSubmitted = true;
        });
    } else {
      this.interestService
        .editInterest(this.interest)
        .subscribe({
          next: (res) => this.interestForm.patchValue(res),
          error: (err: HttpErrorResponse) => {
            if (err.error?.errors) {
              this.alertService.error(
                undefined,
                err.error.errors[Object.keys(err.error.errors)[0]][0]
              );
            } else if (err.error) this.alertService.error(undefined, err.error);
          },
        })
        .add(() => {
          this.isLoading = false;
          this.isSubmitted = true;
        });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
