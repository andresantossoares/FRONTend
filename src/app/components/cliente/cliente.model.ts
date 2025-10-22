// cliente.model.ts

export interface Cliente {
  cliId: number;
  CliNome: string;
  CliCpf: string;
  contato: Contato;
  endereco: Endereco;  // Adiciona o objeto de endereço
}

export interface Contato {
  conId?: number;
  conCelular: string;
  conTelefoneComercial?: string;
  conEmail: string;
}

export interface Endereco {
  id?: number;
  endRua: string;
  endNumero?: number;
  endCidade: string;
  endEstado: string;
  endCep: string;
}