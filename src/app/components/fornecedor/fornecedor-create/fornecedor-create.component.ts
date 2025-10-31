import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../fornecedor.service';
import { Router } from '@angular/router';
import { Fornecedor } from '../fornecedor.model';


@Component({
 selector: 'app-fornecedor-create',
 templateUrl: './fornecedor-create.component.html',
 styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent  {

 fornecedor: Fornecedor = {
  forId: 0,
  forNomeFantasia: '',  
  forCnpj: '',         
  forRazaoSocial: '',  

 conCelular: '',
 conTelefoneComercial: '',
 conEmail: '',
  endRua: '',
   endNumero: 0, 
   endCidade: '',
   endEstado: '',
  endCep: '',
   };

  constructor(
  private fornecedorService: FornecedorService,
   private router: Router
 ) {}


    
 createFornecedor(): void {
  this.fornecedorService.create(this.fornecedor).subscribe(() => {
    this.fornecedorService.showMessage('fornecedor foi criado!');
    this.router.navigate(['/fornecedor']);
  });
}

cancel(): void {
  this.router.navigate(['/fornecedor']);
}
}
