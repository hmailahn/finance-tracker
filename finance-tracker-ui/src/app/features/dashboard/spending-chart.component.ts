import { Component, Input, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Transaction } from '../../models/transaction.model';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-spending-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div style="background:#fff;border:0.5px solid #e0e0d8;border-radius:12px;padding:1.25rem;margin-bottom:1.5rem">
      <h3 style="margin:0 0 1rem;font-size:15px;font-weight:500">Spending by category</h3>
      <canvas baseChart
        [data]="chartData"
        [options]="chartOptions"
        type="bar">
      </canvas>
    </div>
  `
})
export class SpendingChartComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];

  chartData: ChartData<'bar'> = { labels: [], datasets: [] };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '$' + value
        }
      }
    }
  };

  ngOnChanges() {
    const map: Record<string, number> = {};
    this.transactions
      .filter(t => t.amount < 0)
      .forEach(t => {
        map[t.category] = (map[t.category] ?? 0) + Math.abs(t.amount);
      });

    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

    this.chartData = {
      labels: sorted.map(([cat]) => cat),
      datasets: [{
        data: sorted.map(([, total]) => total),
        backgroundColor: ['#0f6e56','#534AB7','#993c1d','#854F0B','#185FA5'],
        borderRadius: 6,
      }]
    };
  }
}