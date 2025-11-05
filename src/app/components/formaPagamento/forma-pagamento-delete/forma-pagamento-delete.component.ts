import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPagamento } from '../formaPagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';

@Component({
  selector: 'app-forma-pagamento-delete',
  templateUrl: './forma-pagamento-delete.component.html',
  styleUrls: ['./forma-pagamento-delete.component.css']
})
export class FormaPagamentoDeleteComponent implements OnInit {
  formaPagamento!: FormaPagamento;

  constructor(
    private formaPagamentoService: FormaPagamentoService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const fId = this.route.snapshot.paramMap.get('fId');
    this.formaPagamentoService.readById(Number(fId!)).subscribe((formaPagamento: FormaPagamento) => {
      this.formaPagamento = formaPagamento;
    });
  }

  deleteFormaPagamento(): void {
    this.formaPagamentoService.delete(this.formaPagamento.fId).subscribe(() => {
      this.formaPagamentoService.showMessage('Forma de pagamento excluída com sucesso!');
      this.router.navigate(['/fpagamentos']);
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }
}
