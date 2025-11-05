import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';
import { FormaPagamentoCreateComponent } from './components/formaPagamento/forma-pagamento-create/forma-pagamento-create.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component';
import { LivroCreateComponent } from './components/livro/livro-create/livro-create.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';
import { LivroDeleteComponent } from './components/livro/livro-delete/livro-delete.component';
import { LivroUpdateComponent } from './components/livro/livro-update/livro-update.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { FormaPagamentoUpdateComponent } from './components/formaPagamento/forma-pagamento-update/forma-pagamento-update.component';
import { FormaPagamentoDeleteComponent } from './components/formaPagamento/forma-pagamento-delete/forma-pagamento-delete.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';


//configuração para rotear entre as paginas na home
const routes: Routes = [
  {
    path: "",
    component: InicioComponent
  },
  {
    path: "fpagamentos",
    component: FormaPagamentoCrudComponent
  },

  {path: "fornecedor",
    component: FornecedorCrudComponent
  },
  {
    path: "fpagamentos/create",
    component: FormaPagamentoCreateComponent
  },
{path: "fornecedor/create",
  component: FornecedorCreateComponent
},
  {path: "cliente/create",
    component: ClienteCreateComponent
  },
  {path: "cliente",
    component: ClienteCrudComponent
  },
  {path: "livro",
    component: LivroCrudComponent
  },
  {path: "livro/create",
    component: LivroCreateComponent
  },
  {path: "fornecedor/read",
    component: FornecedorReadComponent
  },
  { path: "fornecedor/delete/:forId",
    component: FornecedorDeleteComponent 
  },

  { path: "livro/delete/:liId", 
    component: LivroDeleteComponent 
  },
  { path: "livro/update/:liId",
    component: LivroUpdateComponent  
  },
  { path: "fornecedor/update/:forId",
    component: FornecedorUpdateComponent  
  },
  { path: 'formaPagamento/update/:fId', component: FormaPagamentoUpdateComponent },
  { path: 'formaPagamento/delete/:fId', component: FormaPagamentoDeleteComponent },
  { path: "cliente/update/:cliId",
    component: ClienteUpdateComponent  
  },
  { path: "cliente/delete/:cliId",
    component: ClienteDeleteComponent 
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
