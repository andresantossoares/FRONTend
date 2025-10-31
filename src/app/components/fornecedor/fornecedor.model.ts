export interface Fornecedor{
  forId: 0;
    forNomeFantasia: string;
    forCnpj: string;
    forRazaoSocial: string;

    conCelular: string;
    conTelefoneComercial?: string;
    conEmail: string;
  
  
  
    endRua: string;
    endNumero?: number;
    endCidade: string;
    endEstado: string;
    endCep: string;
  }