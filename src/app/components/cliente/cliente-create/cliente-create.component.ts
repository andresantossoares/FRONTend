import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {

// cliente-create.component.ts (parte da declaração ou inicialização)

cliente: Cliente = {
  cliId: 0, // Ajuste para 0 ou null conforme seu modelo
  // ... Outras propriedades
  cliNome: '',       // ✅ Correto (camelCase)
  cliCpf: '',        // ✅ Correto (camelCase)
  conCelular: '',
  conTelefoneComercial: '',
  conEmail: '',
  endRua: '',
  endNumero: 0, // Se endNumero for number
  endCidade: '',
  endEstado: '',
  endCep: '',
  // ...
};

  constructor(
    private clienteService: ClienteService,
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
