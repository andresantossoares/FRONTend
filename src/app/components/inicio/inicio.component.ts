import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { forkJoin } from 'rxjs';
import { ClienteService } from '../cliente/cliente.service';
import { LivroService } from '../livro/livro.service';
import { FornecedorService } from '../fornecedor/fornecedor.service';
import { FormaPagamentoService } from '../formaPagamento/forma-pagamento.service';
import { Cliente } from '../cliente/cliente.model';
import { Livro } from '../livro/livro.model';
import { Fornecedor } from '../fornecedor/fornecedor.model';
import { FormaPagamento } from '../formaPagamento/formaPagamento.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit {

  // Estatísticas
  totalLivros: number = 0;
  totalClientes: number = 0;
  totalFornecedores: number = 0;
  totalFormasPagamento: number = 0;

  // Tabela de dados recentes
  displayedColumns: string[] = ['tipo', 'nome', 'detalhes', 'data', 'acoes'];
  dataSource = new MatTableDataSource<any>([]);
  
  // Filtro
  filterValue: string = '';
  selectedTab: string = 'todos';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clienteService: ClienteService,
    private livroService: LivroService,
    private fornecedorService: FornecedorService,
    private formaPagamentoService: FormaPagamentoService
  ) { }

  ngOnInit(): void {
    this.carregarDados();
    this.configurarFiltroPredicate();
    
    // Inscrever-se em mudanças no contador de formas de pagamento
    this.formaPagamentoService.contador$.subscribe(acao => {
      if (acao === 'increment') {
        this.totalFormasPagamento++;
      } else if (acao === 'decrement') {
        this.totalFormasPagamento = Math.max(0, this.totalFormasPagamento - 1);
      }
    });
  }

  ngAfterViewInit() {
    // Aguardar um tick para garantir que os ViewChild estão inicializados
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
        // Configurar sorting para propriedades customizadas
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
          switch (property) {
            case 'tipo': return item.tipo;
            case 'nome': return item.nome;
            case 'detalhes': return item.detalhes;
            case 'data': return item.data.getTime();
            default: return item[property];
          }
        };
      }
    });
  }

  private configurarFiltroPredicate(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const tipoSelecionado = this.selectedTab;
      const searchStr = this.filterValue.trim().toLowerCase();
      
      // Verificar se corresponde à busca
      const matchesSearch = !searchStr || 
                           (data.nome && data.nome.toLowerCase().includes(searchStr)) ||
                           (data.detalhes && data.detalhes.toLowerCase().includes(searchStr)) ||
                           (data.tipo && data.tipo.toLowerCase().includes(searchStr));
      
      // Verificar se corresponde ao tipo selecionado
      if (tipoSelecionado === 'todos') {
        return matchesSearch;
      } else {
        const dataTipoLower = data.tipo ? data.tipo.toLowerCase() : '';
        const tipoSelecionadoLower = tipoSelecionado.toLowerCase();
        
        // Comparação flexível para tipos similares
        const matchesTipo = dataTipoLower === tipoSelecionadoLower || 
                          (tipoSelecionadoLower === 'livro' && dataTipoLower.includes('livro')) ||
                          (tipoSelecionadoLower === 'cliente' && dataTipoLower.includes('cliente')) ||
                          (tipoSelecionadoLower === 'fornecedor' && dataTipoLower.includes('fornecedor')) ||
                          (tipoSelecionadoLower === 'forma de pagamento' && dataTipoLower.includes('forma') && dataTipoLower.includes('pagamento'));
        
        return matchesTipo && matchesSearch;
      }
    };
  }

  carregarDados(): void {
    // Carregar todos os dados em paralelo
    forkJoin({
      livros: this.livroService.read(),
      clientes: this.clienteService.read(),
      fornecedores: this.fornecedorService.read(),
      formasPagamento: this.formaPagamentoService.read()
    }).subscribe({
      next: ({ livros, clientes, fornecedores, formasPagamento }) => {
        // Atualizar estatísticas
        this.totalLivros = livros.length;
        this.totalClientes = clientes.length;
        this.totalFornecedores = fornecedores.length;
        this.totalFormasPagamento = formasPagamento.length;

        // Preparar dados para a tabela
        const dadosRecentes: any[] = [];

        // Adicionar livros
        livros.slice(0, 10).forEach(livro => {
          dadosRecentes.push({
            id: livro.liId,
            tipo: 'Livro',
            nome: livro.liNome || 'Sem nome',
            detalhes: `${livro.liNumeroPagi || 0} páginas`,
            data: new Date(),
            rota: `/livro`,
            icon: 'menu_book',
            cor: '#3498DB'
          });
        });

        // Adicionar clientes
        clientes.slice(0, 10).forEach(cliente => {
          dadosRecentes.push({
            id: cliente.cliId,
            tipo: 'Cliente',
            nome: cliente.cliNome || 'Sem nome',
            detalhes: cliente.cliCpf || 'Sem CPF',
            data: new Date(),
            rota: `/cliente`,
            icon: 'person',
            cor: '#2ECC71'
          });
        });

        // Adicionar fornecedores
        fornecedores.slice(0, 10).forEach(fornecedor => {
          dadosRecentes.push({
            id: fornecedor.forId,
            tipo: 'Fornecedor',
            nome: fornecedor.forNomeFantasia || 'Sem nome',
            detalhes: fornecedor.forCnpj || 'Sem CNPJ',
            data: new Date(),
            rota: `/fornecedor`,
            icon: 'local_shipping',
            cor: '#E67E22'
          });
        });

        // Adicionar formas de pagamento
        formasPagamento.slice(0, 10).forEach(formaPagamento => {
          dadosRecentes.push({
            id: formaPagamento.fId,
            tipo: 'Forma de Pagamento',
            nome: formaPagamento.tipo || 'Sem tipo',
            detalhes: formaPagamento.permite_troco ? 'Permite troco' : 'Não permite troco',
            data: new Date(),
            rota: `/fpagamentos`,
            icon: 'payment',
            cor: '#9B59B6'
          });
        });

        // Embaralhar e ordenar por data (mais recentes primeiro)
        dadosRecentes.sort((a, b) => b.data.getTime() - a.data.getTime());
        
        // Atualizar dataSource
        this.dataSource.data = dadosRecentes;
        
        // Reaplicar filtro após atualizar dados
        if (this.filterValue || this.selectedTab !== 'todos') {
          this.aplicarFiltro();
        }
        
        // Atualizar paginator e sort após dados carregados
        setTimeout(() => {
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        });
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        this.dataSource.data = [];
      }
    });
  }

  aplicarFiltro(): void {
    this.configurarFiltroPredicate();
    // Forçar atualização do filtro usando uma string única
    this.dataSource.filter = `${this.filterValue}_${this.selectedTab}_${Date.now()}`;
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  limparFiltro(): void {
    this.filterValue = '';
    this.aplicarFiltro();
  }

  filtrarPorTipo(tipo: string): void {
    this.selectedTab = tipo;
    this.aplicarFiltro();
  }
}
