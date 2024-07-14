export interface Tarefa {
  // proriedades opcionais '?'.
  id?: number;
  titulo: string;
  descricao: string;
  finalizado: boolean;
  dataVencimento: Date;
  prioridade: number;
}
