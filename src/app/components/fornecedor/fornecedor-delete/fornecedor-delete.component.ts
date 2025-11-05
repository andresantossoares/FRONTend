import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-delete',
  templateUrl: './fornecedor-delete.component.html',
  styleUrls: ['./fornecedor-delete.component.css']
})
export class FornecedorDeleteComponent implements OnInit {
  fornecedor!: Fornecedor;

  constructor(
    private fornecedorService: FornecedorService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const forId = this.route.snapshot.paramMap.get('forId');
    this.fornecedorService.readById(forId!).subscribe((fornecedor: Fornecedor) => {
      this.fornecedor = fornecedor;
    });
  }

  deleteFornecedor(): void {
    this.fornecedorService.delete(this.fornecedor.forId).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor excluído com sucesso!');
      this.router.navigate(['/fornecedor']);
    });
  }

  cancel(): void {
    this.router.navigate(['/fornecedor']);
  }
}
