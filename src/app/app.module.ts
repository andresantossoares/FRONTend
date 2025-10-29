import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Módulos importados de "material" para usar seus componentes
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';  // Adicionado para resolver o erro de mat-icon
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Outros módulos
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

// Componentes
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';
import { FormaPagamentoCreateComponent } from './components/formaPagamento/forma-pagamento-create/forma-pagamento-create.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component';
import { LivroCreateComponent } from './components/livro/livro-create/livro-create.component';
import { LivroReadComponent } from './components/livro/livro-read/livro-read.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { EnderecoCreateComponent } from './components/endereco/endereco-create/endereco-create.component';
import { ContatoCreateComponent } from './components/contato/contato-create/contato-create.component';
import { FormaPagamentoReadComponent } from './components/formaPagamento/forma-pagamento-read/forma-pagamento-read.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    FormaPagamentoCrudComponent,
    FornecedorCrudComponent,
    FormaPagamentoCreateComponent,
    FornecedorCreateComponent,
    ClienteCrudComponent,
    ClienteCreateComponent,
    LivroCrudComponent,
    LivroCreateComponent,
    LivroReadComponent,
    FornecedorReadComponent,
    ClienteReadComponent,
    EnderecoCreateComponent,
    ContatoCreateComponent,
    FormaPagamentoReadComponent
    // Removido: MatButtonModule (não pertence aqui)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Módulos do Angular Material (organizados e sem duplicatas)
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,  // Necessário para mat-icon
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    // Outros módulos
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
