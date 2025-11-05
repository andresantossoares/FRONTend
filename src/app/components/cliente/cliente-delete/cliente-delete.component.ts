import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const cliId = this.route.snapshot.paramMap.get('cliId');
    this.clienteService.readById(cliId!).subscribe((cliente: Cliente) => {
      this.cliente = cliente;
    });
  }

  deleteCliente(): void {
    this.clienteService.delete(this.cliente.cliId).subscribe(() => {
      this.clienteService.showMessage('Cliente excluído com sucesso!');
      this.router.navigate(['/cliente']);
    });
  }

  cancel(): void {
    this.router.navigate(['/cliente']);
  }
}
