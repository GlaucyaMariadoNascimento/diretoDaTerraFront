import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/categoria';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0);

    // if(environment.token == '') {
    //   this.router.navigate(['/entrar'])
    // }

    // if(environment.tipo != 'adm') {
    //   this.alertas.showAlertInfo("Você precisa ser administrador para acessar essa rota!")
    //   this.router.navigate(['/produto'])
    // }

    this.categoriaService.refreshToken()
    this.findAllCategorias()
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  cadastrar() {
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) => {this.categoria = resp
      this.alertas.showAlertSuccess('Categoria cadastrada com sucesso!')
    this.findAllCategorias()
    this.categoria = new Categoria()
    })
  }

}
