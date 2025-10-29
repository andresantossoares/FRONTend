import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-read',
  templateUrl: './fornecedor-read.component.html',
  styleUrls: ['./fornecedor-read.component.css']
})
export class FornecedorReadComponent implements OnInit {

  fornecedor!: Fornecedor[]
  displayedColumns = ['fId','fNomeFantasia', 'fCnpj',  'fRazaoSocial', 'action']

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.fornecedorService.read().subscribe((fornecedor: Fornecedor[]) => {
      this.fornecedor = fornecedor;
      console.log(fornecedor);
    })
  }

}