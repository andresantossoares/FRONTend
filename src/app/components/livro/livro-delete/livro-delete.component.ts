import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {
  livro!: Livro;
  isLoading: boolean = true;  // Adicione esta linha: propriedade para controlar o estado de carregamento

  constructor(
    private livroService: LivroService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const liId = this.route.snapshot.paramMap.get('liId');
    if (liId) {
      this.livroService.readById(liId).subscribe({
        next: (livro) => {
          this.livro = livro;
          this.isLoading = false;  // Define como false quando os dados chegam
        },
        error: (err) => {
          console.error('Erro ao carregar livro:', err);
          this.isLoading = false;  // Define como false mesmo em erro
          // Opcional: redirecionar ou mostrar mensagem de erro
        }
      });
    } else {
      console.error('liId não encontrado nos parâmetros da rota');
      this.isLoading = false;  // Define como false se não houver liId
    }
  }

  deleteLivro(): void {
    if (!this.livro) {
      console.error('Livro não carregado. Não é possível excluir.');
      return;
    }
    this.livroService.delete(this.livro.liId).subscribe({
      next: () => {
        this.livroService.showMessage('livro excluído com sucesso!');
        this.router.navigate(['/livro']);
      },
      error: (err) => {
        console.error('Erro ao excluir livro:', err);
        // Opcional: mostrar mensagem de erro
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/livro']);
  }
}
