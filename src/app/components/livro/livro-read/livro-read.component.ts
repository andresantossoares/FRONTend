import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

  livro!: Livro[]
  displayedColumns = ['liId', 'liAvaliacao', 'liNome',  'liNumeroPagi', 'action']

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.livroService.read().subscribe((resposta: Livro[]) => {
      this.livro = resposta;
      console.log(this.livro);
    });

}
}