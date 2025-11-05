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

  constructor(
    private livroService: LivroService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const liId = this.route.snapshot.paramMap.get('liId');
    this.livroService.readById(liId!).subscribe((livro: Livro) => {
      this.livro = livro;
    });
  }

  deleteLivro(): void {
    this.livroService.delete(this.livro.liId).subscribe(() => {
      this.livroService.showMessage('livro excluído com sucesso!');
      this.router.navigate(['/livro']);
    });
  }

  cancel(): void {
    this.router.navigate(['/livro']);
  }
}
