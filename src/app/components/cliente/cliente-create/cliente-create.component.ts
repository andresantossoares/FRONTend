import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';
import { EnderecoService } from '../../endereco/endereco.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {

  cliente: Cliente = {
    cliId: 0,
    CliNome: '',
    CliCpf: '',
    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',
    endRua: '',
    endNumero: 0,  
    endCidade: '',
    endEstado: '',
    endCep: '',
  };

  constructor(
    private clienteService: ClienteService,
    private endereco: EnderecoService,  
    private router: Router
  ) {}

  createCliente(): void {
    this.clienteService.create(this.cliente).subscribe(() => {
      this.clienteService.showMessage('cliente foi criado!');
      this.router.navigate(['/cliente']);
    });
  }

  cancel(): void {
    this.router.navigate(['/cliente']);
  }
}
