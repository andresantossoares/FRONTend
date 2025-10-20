import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from '../contato.mode';
import { ContatoService } from '../contato.service';

@Component({  // <<< ESSENCIAL
  selector: 'app-contato-create',
  templateUrl: './contato-create.component.html',
  styleUrls: ['./contato-create.component.css']
})
export class ContatoCreateComponent {

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
      this.router.navigate(['/contato']);
    });
  }

  cancel(): void {
    this.router.navigate(['/contato']);
  }

}
