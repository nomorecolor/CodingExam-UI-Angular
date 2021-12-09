import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user!: User;
  loginForm!: FormGroup;

  isSubmitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  onSubmit(): void {
    this.isSubmitted = false;
    this.isLoading = true;

    if (this.loginForm.invalid) {
      this.isSubmitted = true;
      this.isLoading = false;
      return;
    }

    this.user = this.loginForm.value;

    this.authService
      .login(this.user)
      .subscribe({
        next: (res) => this.router.navigate(['/home']),
        error: () => this.alertService.error(),
      })
      .add(() => {
        this.isSubmitted = true;
        this.isLoading = false;
      });
  }
}
