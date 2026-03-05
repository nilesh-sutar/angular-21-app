import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Field, form } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from "src/app/shared/components/button/button";
import { NgxToasterService } from 'src/app/shared/services/ngx-toaster.service';
import { AuthService } from '../../core/auth.service';
import { AuthStore } from './../../store/auth.store';

@Component({
  selector: 'app-login',
  template: `
    <h2>Login</h2>
    <form>
      <div class="mb-3 mt-3">
        <label for="username">Username:</label>
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter username"
          [field]="loginForm.username"
        />
      </div>
      <div class="mb-3">
        <label for="pwd">Password:</label>
        <input
          type="password"
          class="form-control"
          id="pwd"
          placeholder="Enter password"
          [field]="loginForm.password"
        />
      </div>
      <div class="form-check mb-3">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" [field]="loginForm.remember" /> Remember
          me
        </label>
      </div>
      <app-button
        [config]="{ disabled: authStore.isLoading(), label: authStore.isLoading() ? 'Logging in...' : 'Login' }"
        (onClick)="onSubmit()"
      >
      </app-button>
    </form>
    <p class="mt-3">
      Don't have an account? <a routerLink="/auth/register" class="btn-link">Register here</a>
    </p>
  `,
  styles: [``],
  imports: [Field, RouterLink, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  authService = inject(AuthService);
  authStore = inject(AuthStore);
  router = inject(Router);
  toasterService = inject(NgxToasterService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void { }

  loginModel = signal({
    username: '',
    password: '',
    remember: false,
  });

  loginForm = form(this.loginModel);

  async onSubmit() {
    await this.authStore.login(this.loginModel().username, this.loginModel().password);
    const redirectUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
    if (this.authStore.isAuthenticated()) {
      this.router.navigate([redirectUrl]);
    } else {
      this.toasterService.showError(this.authStore.error() || 'Login failed');
    }
  }
}
