import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-delete',
  templateUrl: './fornecedor-delete.component.html',
  styleUrls: ['./fornecedor-delete.component.css']
})
export class FornecedorDeleteComponent implements OnInit {
  fornecedor!: Fornecedor;
  isLoading: boolean = true;  // Adicione esta linha: propriedade para controlar o estado de carregamento

  constructor(
    private fornecedorService: FornecedorService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const forId = this.route.snapshot.paramMap.get('forId');
    if (forId) {
      this.fornecedorService.readById(forId).subscribe({
        next: (fornecedor) => {
          this.fornecedor = fornecedor;
          this.isLoading = false;  // Define como false quando os dados chegam
        },
        error: (err) => {
          console.error('Erro ao carregar fornecedor:', err);
          this.isLoading = false;  // Define como false mesmo em erro
          // Opcional: redirecionar ou mostrar mensagem de erro
        }
      });
    } else {
      console.error('forId não encontrado nos parâmetros da rota');
      this.isLoading = false;  // Define como false se não houver forId
    }
  }

  deleteFornecedor(): void {
    if (!this.fornecedor) {
      console.error('Fornecedor não carregado. Não é possível excluir.');
      return;
    }
    this.fornecedorService.delete(this.fornecedor.forId).subscribe({
      next: () => {
        this.fornecedorService.showMessage('Fornecedor excluído com sucesso!');
        this.router.navigate(['/fornecedor']);
      },
      error: (err) => {
        console.error('Erro ao excluir fornecedor:', err);
        // Opcional: mostrar mensagem de erro
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fornecedor']);
  }
}
