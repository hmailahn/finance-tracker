import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card">
        <h1>Finance Tracker</h1>
        <h2>Sign in</h2>

        @if (error()) {
          <div class="error-banner">{{ error() }}</div>
        }

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            Email
            <input formControlName="email" type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input formControlName="password" type="password" placeholder="Your password" />
          </label>
          <button type="submit" [disabled]="form.invalid || loading()">
            {{ loading() ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <p class="switch">Don't have an account? <a routerLink="/register">Register</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9f9f7;
    }
    .auth-card {
      background: #fff;
      border: 0.5px solid #e0e0d8;
      border-radius: 16px;
      padding: 2rem;
      width: 100%;
      max-width: 400px;
    }
    h1 { font-size: 18px; font-weight: 500; color: #888; margin: 0 0 4px; }
    h2 { font-size: 24px; font-weight: 500; margin: 0 0 1.5rem; }
    form { display: flex; flex-direction: column; gap: 12px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #555; }
    input { padding: 10px 12px; border: 0.5px solid #ccc; border-radius: 8px; font-size: 14px; }
    input:focus { outline: none; border-color: #888; }
    button {
      margin-top: 8px; padding: 10px; background: #1a1a1a; color: #fff;
      border: none; border-radius: 8px; font-size: 14px; cursor: pointer;
    }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .error-banner {
      background: #fcebeb; border: 0.5px solid #f09595; color: #791f1f;
      border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 1rem;
    }
    .switch { text-align: center; font-size: 13px; color: #888; margin-top: 1rem; }
    .switch a { color: #1a1a1a; }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);

    this.auth.login(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/transactions']),
      error: (err) => {
        this.error.set(err.error?.error ?? 'Login failed. Please try again.');
        this.loading.set(false);
      }
    });
  }
}