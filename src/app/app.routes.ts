import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'operadoras', loadComponent: () => import('./pages/operadoras/operadoras.component').then(m => m.OperadorasComponent) },
      { path: 'contratos', loadComponent: () => import('./pages/contratos/contratos.component').then(m => m.ContratosComponent) },
      { path: 'faturas', loadComponent: () => import('./pages/faturas/faturas.component').then(m => m.FaturasComponent) }
    ]
  }
];
