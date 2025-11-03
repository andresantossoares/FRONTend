import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  livro!: Livro;

  constructor(private livroService: LivroService, 
    private router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const liId = this.route.snapshot.paramMap.get('liId')
    this.livroService.readById(liId!).subscribe((livro: Livro) =>{
      this.livro = livro
    })
    
  }

  updateLivro(): void {
    this.livroService.update(this.livro).subscribe(() => {
      this.livroService.showMessage('livro atualizado com sucesso!')
      this.router.navigate(['/livro'])
    })
  }

  cancel(): void {
    this.router.navigate(['/livro'])
  }


}

