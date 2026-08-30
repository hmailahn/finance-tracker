import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, CATEGORIES } from '../../models/transaction.model';
import { SpendingChartComponent } from '../dashboard/spending-chart.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, DatePipe, SpendingChartComponent],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  private svc = inject(TransactionService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  transactions = signal<Transaction[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  selectedCategory = signal<string>('All');
  categories = CATEGORIES;
  currentUser = this.authService.currentUser;

  filteredTransactions = computed(() => {
    if (this.selectedCategory() === 'All') return this.transactions();
    return this.transactions().filter(t => t.category === this.selectedCategory());
  });

  totalIncome = computed(() =>
    this.transactions()
      .filter((t) => t.amount > 0)
      .reduce((s, t) => s + t.amount, 0)
  );

  totalExpenses = computed(() =>
    this.transactions()
      .filter((t) => t.amount < 0)
      .reduce((s, t) => s + Math.abs(t.amount), 0)
  );

  net = computed(() => this.totalIncome() - this.totalExpenses());

  form = this.fb.group({
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category: ['Food', Validators.required],
    date: [new Date().toISOString().slice(0, 10), Validators.required],
    type: ['EXPENSE' as const, Validators.required],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.svc.getAll().subscribe({
      next: (txns) => {
        this.transactions.set(txns);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load transactions. Is the backend running?');
        this.loading.set(false);
      },
    });
  }

  openForm(txn?: Transaction) {
    if (txn) {
      this.editingId.set(txn.id!);
      this.form.patchValue({
        description: txn.description,
        amount: Math.abs(txn.amount),
        category: txn.category,
        date: txn.date,
        type: txn.type as 'EXPENSE',
      });
    } else {
      this.editingId.set(null);
      this.form.reset({
        category: 'Food',
        type: 'EXPENSE',
        date: new Date().toISOString().slice(0, 10),
        amount: 0,
      });
    }
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  submit() {
    if (this.form.invalid) return;

    const raw = this.form.value;
    const payload = {
      ...raw,
      // store expenses as negative, income as positive
      amount:
        raw.type === 'EXPENSE'
          ? -Math.abs(raw.amount!)
          : Math.abs(raw.amount!),
    } as Transaction;

    const id = this.editingId();

    if (id) {
      this.svc.update(id, { ...payload, id }).subscribe((updated) => {
        this.transactions.update((list) =>
          list.map((t) => (t.id === id ? updated : t))
        );
        this.closeForm();
      });
    } else {
      this.svc.create(payload).subscribe((saved) => {
        this.transactions.update((list) => [saved, ...list]);
        this.closeForm();
      });
    }
  }

  delete(id: number) {
    if (!confirm('Delete this transaction?')) return;
    this.svc.delete(id).subscribe(() =>
      this.transactions.update((list) => list.filter((t) => t.id !== id))
    );
  }

  logout() {
    this.authService.logout();
  }
}
