export interface Cliente {
  cliId: number;
  cliNome: string;
  cliCpf: string;
  conCelular: string;
  conTelefoneComercial?: string;
  conEmail: string;
  endRua: string;
  endNumero?: number;
  endCidade: string;
  endEstado: string;
  endCep: string;
}