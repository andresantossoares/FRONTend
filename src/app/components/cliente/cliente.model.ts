export interface Cliente {
  cliId: 0
  
    cliNome: string; // ✅ Agora alinha com o HTML
    cliCpf: string;  // ✅ Agora alinha com o HTML

  conCelular: string;
  conTelefoneComercial?: string;
  conEmail: string;



  endRua: string;
  endNumero?: number;
  endCidade: string;
  endEstado: string;
  endCep: string;
}