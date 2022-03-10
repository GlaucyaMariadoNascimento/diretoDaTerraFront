import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/categoria';
import { Produto } from '../model/produto';
import { Usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  listaProdutos: Produto[]

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  user: Usuario = new Usuario()
  idUser = environment.id

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    public authService: AuthService,
    public auth: AuthService

  ) { }

  ngOnInit() {
    window.scroll(0,0)

  //   this.authService.refreshToken()
  this.produtoService.refreshToken()
    this.getAllProduto()
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  getAllProduto() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
      console.log(this.listaProdutos)
    })
  }

  publicar() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.user.id = this.idUser
    this.produto.usuario = this.user

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      alert('Postagem realizada com sucesso!')
      this.produto = new Produto()
      this.getAllProduto()
    })
  }

}
