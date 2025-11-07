import { Component, OnInit } from '@angular/core';
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
export class LivroCreateComponent implements OnInit {

  livro: Livro = {
    liId: 0,
    liNome: '',
    liDescricao: '',
    liAvaliacao: 0,
    liNumeroPagi: 0,
    forNomeFantasia: '',
    forCnpj: '',
    forRazaoSocial: ''
  };

  fornecedores: Fornecedor[] = [];
  fornecedorSelecionado: Fornecedor | null = null;

  constructor(
    private livroService: LivroService,
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fornecedorService.read().subscribe((fornecedores: any[]) => {
      // Mapeia os fornecedores caso o backend retorne 'id' ao invés de 'forId'
      this.fornecedores = fornecedores.map((fornecedor: any) => ({
        forId: fornecedor.forId || fornecedor.id || fornecedor.Id || 0,
        forNomeFantasia: fornecedor.forNomeFantasia || '',
        forCnpj: fornecedor.forCnpj || '',
        forRazaoSocial: fornecedor.forRazaoSocial || '',
        conCelular: fornecedor.conCelular || '',
        conTelefoneComercial: fornecedor.conTelefoneComercial || '',
        conEmail: fornecedor.conEmail || '',
        endRua: fornecedor.endRua || '',
        endNumero: fornecedor.endNumero || 0,
        endCidade: fornecedor.endCidade || '',
        endEstado: fornecedor.endEstado || '',
        endCep: fornecedor.endCep || ''
      }));
    });
  }

  onFornecedorChange(fornecedor: Fornecedor | null): void {
    if (fornecedor) {
      this.fornecedorSelecionado = fornecedor;
      // Preenche automaticamente os dados do fornecedor selecionado
      this.livro.forNomeFantasia = fornecedor.forNomeFantasia || '';
      this.livro.forCnpj = fornecedor.forCnpj || '';
      this.livro.forRazaoSocial = fornecedor.forRazaoSocial || '';
    } else {
      this.fornecedorSelecionado = null;
      this.livro.forNomeFantasia = '';
      this.livro.forCnpj = '';
      this.livro.forRazaoSocial = '';
    }
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

