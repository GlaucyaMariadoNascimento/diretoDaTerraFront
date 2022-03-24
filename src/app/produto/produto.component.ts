import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/categoria';
import { Produto } from '../model/produto';
import { Usuario } from '../model/usuario';
import { AlertasService } from '../service/alertas.service';
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
  nomeProduto: string

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
    public auth: AuthService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0,0)

  //   this.authService.refreshToken()
  this.produtoService.refreshToken()
    this.getAllProduto()
    this.getAllCategorias()
  }

    getAllProduto() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
      console.log(this.listaProdutos)
    })
  }

  getAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  publicar() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.user.id = this.idUser
    this.produto.usuario = this.user

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.produto = new Produto()
      this.getAllProduto()
    })
  }

  findByNomeProduto() {

    if(this.nomeProduto == '') {
      this.getAllProduto()
    } else {
      this.produtoService.getByNomeProduto(this.nomeProduto). subscribe((resp: Produto[]) => {
        this.listaProdutos = resp
      })
    }
  }

}
