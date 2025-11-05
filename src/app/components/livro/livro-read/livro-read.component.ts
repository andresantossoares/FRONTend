import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit, AfterViewInit {

  displayedColumns = ['liId', 'liAvaliacao', 'liNome',  'liNumeroPagi', 'action'];
  dataSource = new MatTableDataSource<Livro>([]);
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.livroService.read().subscribe((resposta: Livro[]) => {
      this.dataSource.data = resposta;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  limparFiltro(): void {
    this.filterValue = '';
    this.aplicarFiltro();
  }

}