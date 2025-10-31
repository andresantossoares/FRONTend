import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormaPagamento } from '../formaPagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';

@Component({  // <<< ESSENCIAL
  selector: 'app-forma-pagamento-create',
  templateUrl: './forma-pagamento-create.component.html',
  styleUrls: ['./forma-pagamento-create.component.css']
})
export class FormaPagamentoCreateComponent {

  formaPagamento: FormaPagamento = {
    fId: 0,
    descricao: '',
    tipo: '',
    numero_parcelas: 0,
    dias_entre_parcelas: 0,
    permite_troco:  '',
    taxa_percentual: 0,
    ativo: ''
  }

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private router: Router
  ) {}

  createFormaPagamento(): void {
    this.formaPagamentoService.create(this.formaPagamento).subscribe(() => {
      this.formaPagamentoService.showMessage('Forma de pagamento criada!');
      this.router.navigate(['/fpagamentos']);
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

}
