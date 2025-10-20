// src/app/models/livro-create.dto.ts
export interface LivroCreateDto {
    liNome: string;
    liDescricao: string;
    liAvaliacao: number;
    liNumeropagi: number;
    liIdioma: string;
    liDataPubli: Date;
    liDimensoes: string;
    liAutor: string;
    fornecedor_id: number;  // Assumindo que é um ID numérico do fornecedor selecionado
  }
  
  // Ou como classe, se precisar de métodos ou validação
  export class LivroCreateDto {
    constructor(
      public liNome: string,
      public liDescricao: string,
      public liAvaliacao: number,
      public liNumeropagi: number,
      public liIdioma: string,
      public liDataPubli: Date,
      public liDimensoes: string,
      public liAutor: string,
      public fornecedor_id: number
    ) {}
  }