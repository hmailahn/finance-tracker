import { Routes } from '@angular/router';
import { TransactionListComponent } from './features/transactions/transaction-list.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'transactions', component: TransactionListComponent, canActivate: [authGuard] },
];