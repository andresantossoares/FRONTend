export interface Fornecedor{
    fId: 0;
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