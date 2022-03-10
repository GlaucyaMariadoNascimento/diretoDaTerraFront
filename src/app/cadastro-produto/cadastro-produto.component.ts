import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/categoria';
import { Produto } from '../model/produto';
import { Usuario } from '../model/usuario';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  listaProduto: Produto[]

  user: Usuario = new Usuario()
  idUser = environment.id

  categoria: Categoria = new Categoria()
  idCategoria: number
  listaCategorias: Categoria[]

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit() {
    window.scroll(0,0);

    // if(environment.token == '') {
    //   this.router.navigate(['/entrar'])
    // }
    this.produtoService.refreshToken()
    this.findAllProdutos()
    this.findAllCategorias()
  }

  findAllProdutos(){
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProduto = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  findAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  cadastrar() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.user.id = this.idUser
    this.produto.usuario = this.user
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {this.produto = resp
    alert('Produto cadastrado com sucesso!')
    this.findAllProdutos()
    this.produto = new Produto()
    })
  }

}
