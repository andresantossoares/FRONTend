import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // For navigation in cancel()
import { Endereco } from '../endereco.model';
import { EnderecoService } from '../endereco.service';


@Component({
  selector: 'app-endereco-create',
  templateUrl: './endereco-create.component.html',
  styleUrls: ['./endereco-create.component.css']
})
export class EnderecoCreateComponent implements OnInit {
  endereco: Endereco = {
    id: 0,
    rua: '',
    numero: 0,
    cidade: '',
    estado: '',
    cep: '',
    ativo: ''
  };

  constructor(
    private enderecoService: EnderecoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize if needed, e.g., load clients for dropdown
  }

  createEndereco(): void {
    if (this.endereco.id === 0 || !this.endereco.rua || !this.endereco.cidade) {
      alert('Preencha os campos obrigatórios!'); // Or use MatSnackBar
      return;
    }
    this.enderecoService.create(this.endereco).subscribe({
      next: (response) => {
        console.log('Endereço criado:', response);
        this.router.navigate(['/enderecos']); // Redirect to list
      },
      error: (err) => {
        console.error('Erro ao criar endereço:', err);
        alert('Erro ao criar endereço.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/enderecos']); // Or wherever you came from
  }
}