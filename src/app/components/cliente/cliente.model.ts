export interface Cliente {
  cliId: 0
  CliNome: string;
  CliCpf: string;  

  conCelular: string;
  conTelefoneComercial?: string;
  conEmail: string;



  endRua: string;
  endNumero?: number;
  endCidade: string;
  endEstado: string;
  endCep: string;
}