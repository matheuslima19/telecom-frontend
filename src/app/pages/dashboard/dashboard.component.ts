import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardResumo } from '../../models/dashboard.model';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NgChartsModule
  ],
  providers: [DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resumo!: DashboardResumo;

  pizzaChartData!: ChartData<'pie', number[], string>;
  pizzaChartType: ChartType = 'pie';

  barChartData!: ChartData<'bar', number[], string>;
  barChartType: ChartType = 'bar';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    console.log('DashboardComponent ngOnInit disparado');

    this.dashboardService.obterResumo().subscribe((res: DashboardResumo) => {
      console.log('Resumo recebido:', res);
      this.resumo = res;
      this.prepararPizza();
      this.prepararBarras();
    });
  }

  prepararPizza() {
    const labels = this.resumo.distribuicaoPorStatus.map(s => s.status);
    const data = this.resumo.distribuicaoPorStatus.map(s => s.quantidade);

    this.pizzaChartData = {
      labels,
      datasets: [
        {
          data
        }
      ]
    };
  }

  prepararBarras() {
    const labels = this.resumo.evolucaoMensal.map(e => e.mes);
    const emitidas = this.resumo.evolucaoMensal.map(e => e.emitidas);
    const pagas = this.resumo.evolucaoMensal.map(e => e.pagas);

    this.barChartData = {
      labels,
      datasets: [
        { data: emitidas, label: 'Emitidas' },
        { data: pagas, label: 'Pagas' }
      ]
    };
  }
}
