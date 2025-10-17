import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from '../contato.mode';
import { ContatoService } from '../contato.service';

@Component({  // <<< ESSENCIAL
  selector: 'app-forma-pagamento-create',
  templateUrl: './forma-pagamento-create.component.html',
  styleUrls: ['./forma-pagamento-create.component.css']
})
export class FormaPagamentoCreateComponent {

  contato: Contato = {
    conId: 0,
    conCelular: '',
    conTelefoneComercial: '',
    conEmail: ''
  }

  constructor(
    private contatoService: ContatoService,
    private router: Router
  ) {}

  createContato(): void {
    this.contatoService.create(this.contato).subscribe(() => {
      this.contatoService.showMessage('Forma de pagamento criada!');
      this.router.navigate(['/fpagamentos']);
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

}
