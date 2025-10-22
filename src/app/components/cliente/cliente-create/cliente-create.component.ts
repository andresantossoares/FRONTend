import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    cliId: 0,
    CliNome: '',
    CliCpf: '',
    contato: {
      conCelular: '',
      conTelefoneComercial: '',
      conEmail: ''
    },
    endereco: {  // Novo: Inicializa o endereço
      endRua: '',
      endNumero: undefined,
      endCidade: '',
      endEstado: '',
      endCep: '',
    }
  };

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  createCliente(): void {
    // Validação básica (adicione validações para endereço se necessário)
    if (!this.cliente.CliNome || !this.cliente.CliCpf || !this.cliente.contato.conCelular || !this.cliente.contato.conEmail ||
        !this.cliente.endereco.endRua || !this.cliente.endereco.endCidade || !this.cliente.endereco.endEstado || !this.cliente.endereco.endCep) {
      this.clienteService.showMessage('Preencha todos os campos obrigatórios!');
      return;
    }

    this.clienteService.create(this.cliente).subscribe({
      next: (response) => {
        this.clienteService.showMessage('Cliente criado com sucesso!');
        console.log('Cliente criado:', response);
        this.cancel();
      },
      error: (err) => {
        this.clienteService.showMessage('Erro ao criar cliente. Tente novamente.');
        console.error('Erro:', err);
      }
    });
  }

  cancel(): void {
    this.clienteService.showMessage('Operação cancelada.');
    this.cliente = {
      cliId: 0,
      CliNome: '',
      CliCpf: '',
      contato: {
        conCelular: '',
        conTelefoneComercial: '',
        conEmail: ''
      },
      endereco: {
        endRua: '',
        endNumero: undefined,
        endCidade: '',
        endEstado: '',
        endCep: '',
      }
    };
  }
}