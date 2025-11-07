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

  formaPagamento: FormaPagamento = {
    fId: 0,
    descricao: '',
    tipo: '',
    numero_parcelas: 0,
    dias_entre_parcelas: 0,
    permite_troco: '',
    taxa_percentual: 0,
    ativo: ''
  };

  constructor(private formaPagamentoService: FormaPagamentoService, 
    private router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const fIdParam = this.route.snapshot.paramMap.get('fId');
    console.log('fId recebido da rota:', fIdParam);
    
    if (!fIdParam || fIdParam === 'null' || fIdParam === 'undefined' || fIdParam.trim() === '') {
      console.error('ID inválido ou não encontrado na rota');
      this.formaPagamentoService.showMessage('ID não encontrado!');
      this.router.navigate(['/fpagamentos']);
      return;
    }

    const fId = Number(fIdParam);
    console.log('fId convertido para número:', fId);
    
    if (isNaN(fId) || fId <= 0) {
      console.error('ID inválido após conversão:', fId);
      this.formaPagamentoService.showMessage('ID inválido!');
      this.router.navigate(['/fpagamentos']);
      return;
    }

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
        console.log('Forma de pagamento mapeada:', this.formaPagamento);
      },
      error: (err) => {
        console.error('Erro ao carregar forma de pagamento:', err);
        this.formaPagamentoService.showMessage('Erro ao carregar forma de pagamento!');
        this.router.navigate(['/fpagamentos']);
      }
    });
  }

  updateFormaPagamento(): void {
    if (!this.formaPagamento.fId || this.formaPagamento.fId <= 0) {
      console.error('ID inválido para update:', this.formaPagamento.fId);
      this.formaPagamentoService.showMessage('ID inválido! Não é possível atualizar.');
      return;
    }
    
    this.formaPagamentoService.update(this.formaPagamento).subscribe({
      next: () => {
        this.formaPagamentoService.showMessage('Forma de pagamento atualizada com sucesso!');
        this.router.navigate(['/fpagamentos']);
      },
      error: (err) => {
        console.error('Erro ao atualizar forma de pagamento:', err);
        this.formaPagamentoService.showMessage('Erro ao atualizar forma de pagamento!');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

}
