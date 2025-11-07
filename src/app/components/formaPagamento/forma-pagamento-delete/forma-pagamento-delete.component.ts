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
    const fIdParam = this.route.snapshot.paramMap.get('fId');
    if (!fIdParam) {
      this.formaPagamentoService.showMessage('ID não encontrado!');
      this.router.navigate(['/fpagamentos']);
      return;
    }
    
    const fId = Number(fIdParam);
    this.formaPagamentoService.readById(fId).subscribe({
      next: (formaPagamento: any) => {
        // Mapeia 'id' do backend para 'fId' do modelo
        this.formaPagamento = {
          fId: formaPagamento.id || formaPagamento.fId || formaPagamento.FId || fId,
          descricao: formaPagamento.descricao || '',
          tipo: formaPagamento.tipo || '',
          numero_parcelas: formaPagamento.numero_parcelas || 0,
          dias_entre_parcelas: formaPagamento.dias_entre_parcelas || 0,
          permite_troco: formaPagamento.permite_troco || '',
          taxa_percentual: formaPagamento.taxa_percentual || 0,
          ativo: formaPagamento.ativo || ''
        };
      },
      error: (err) => {
        console.error('Erro ao carregar forma de pagamento:', err);
        this.formaPagamentoService.showMessage('Erro ao carregar forma de pagamento!');
        this.router.navigate(['/fpagamentos']);
      }
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
