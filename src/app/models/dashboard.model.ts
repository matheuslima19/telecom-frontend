export interface DashboardResumo {
  totalFaturas: number;
  valorTotalFaturado: number;
  distribuicaoPorStatus: { status: string; quantidade: number }[];
  evolucaoMensal: { mes: string; emitidas: number; pagas: number }[];
}
