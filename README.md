# Gestão Telecom - Frontend

Aplicação Angular para gestão de operadoras, contratos e faturas, com dashboard gerencial e design responsivo.

## ✅ Pré-requisitos

- Node.js (v18+)
- Angular CLI
  npm install -g @angular/cli

## ⚙️ Configuração

1. Clone o repositório:
   git clone https://github.com/matheuslima19/telecom-frontend.git
   cd telecom-frontend

2. Instale as dependências:
   npm install

3. Configure a URL da API em src/environments/environment.ts:

export const environment = {
  production: false,
  apiUrl: 'https://localhost:5032/api'
};

## 🛠️ Execução

ng serve

Acesse no navegador:
http://localhost:4200

## 🚀 Funcionalidades

- Dashboard com:
  - Total de faturas
  - Valor total faturado
  - Evolução mensal
  - Distribuição por status
- CRUD de Operadoras
- CRUD de Contratos
- CRUD de Faturas
- Design responsivo com Angular Material

## 🧪 Tecnologias

- Angular 17+
- Angular Material
- NgCharts
- Standalone Components
- RxJS

## 📁 Estrutura principal

app/
  pages/
    dashboard/
    operadoras/
    contratos/
    faturas/
  layout/
assets/
environments/
