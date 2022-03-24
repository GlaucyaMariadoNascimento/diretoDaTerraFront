import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { ContatoComponent } from './contato/contato.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';

import { ProdutoComponent } from './produto/produto.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';

import { CategoriaComponent } from './categoria/categoria.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { SobreComponent } from './sobre/sobre.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { AlertasComponent } from './alertas/alertas.component';



@NgModule({
  declarations: [
    AppComponent,
    CadastrarComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    ContatoComponent,
    InicioComponent,
    ProdutoDeleteComponent,
    ProdutoComponent,
    ProdutoEditComponent,
    CategoriaComponent,
    CadastroProdutoComponent,
    SobreComponent,
    CategoriaEditComponent,
    UsuarioEditComponent,
    CategoriaDeleteComponent,
    CadastroProdutoComponent,
    DetalheProdutoComponent,
    SobreComponent,
    AlertasComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
