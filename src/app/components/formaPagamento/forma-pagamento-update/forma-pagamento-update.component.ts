import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../formaPagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-update',
  templateUrl: './forma-pagamento-update.component.html',
  styleUrls: ['./forma-pagamento-update.component.css']
})
export class FormaPagamentoUpdateComponent implements OnInit {


  formaPagamento!: FormaPagamento;

  constructor(private formaPagamentoService: FormaPagamentoService, 
    private router: Router, 
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      const fId = Number (this.route.snapshot.paramMap.get('fId'))
      this.formaPagamentoService.readById(fId!).subscribe((formaPagamento: FormaPagamento) =>{
        this.formaPagamento = formaPagamento
      })
    
  }

  updateFormaPagamento(): void {
    this.formaPagamentoService.update(this.formaPagamento).subscribe(() => {
      this.formaPagamentoService.showMessage('forma de Pagamento atualizado com sucesso!')
      this.router.navigate(['/formaPagamento'])
    })
  }

  cancel(): void {
    this.router.navigate(['/formaPagamento'])
  }


}


