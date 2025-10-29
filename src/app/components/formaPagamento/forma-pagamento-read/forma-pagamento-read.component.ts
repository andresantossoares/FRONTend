import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../formaPagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';

@Component({
  selector: 'app-forma-pagamento-read',
  templateUrl: './forma-pagamento-read.component.html',
  styleUrls: ['./forma-pagamento-read.component.css']
})
export class FormaPagamentoReadComponent implements OnInit {

  formaPagamento!: FormaPagamento[]
  displayedColumns: string[] = ['FId', 'tipo', 'permite_troco', 'action'];

  constructor(private formaPagamentoService: FormaPagamentoService) { }

  ngOnInit(): void {
    this.formaPagamentoService.read().subscribe(formaPagamento => {
      this.formaPagamento = formaPagamento
      console.log(formaPagamento)  
    })
  }

} 