import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { Fornecedor } from '../../fornecedor/fornecedor.model';
import { FornecedorService } from '../../fornecedor/fornecedor.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent {

  livro: Livro = {
    liId: 0,
    liNome: '',
    liDescricao: '',
    liAvaliacao: 0,
    liNumeropagi: 0,
    forNomeFantasia: '',
    forCnpj: '',
    forRazaoSocial:'',
    

  };

fornecedor: Fornecedor[] = [];

  constructor(
    private livroService: LivroService,
  private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fornecedorService.read().subscribe(fornecedor => {
      this.fornecedor = fornecedor
    }
    )
  }

  createLivro(): void {
    this.livroService.create(this.livro).subscribe(() => {
      this.livroService.showMessage('📚 Livro cadastrado com sucesso!');
      this.router.navigate(['/livro']);
    });
  }

  cancel(): void {
    this.router.navigate(['/livro']);
  }
}

