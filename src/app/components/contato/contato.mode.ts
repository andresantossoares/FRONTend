export interface Contato {
  conId?: number;  // Opcional, pois é gerado automaticamente
  conCelular: string;  // Campo obrigatório
  conTelefoneComercial: string;  // Campo opcional
  conEmail: string;  // Campo obrigatório
}

