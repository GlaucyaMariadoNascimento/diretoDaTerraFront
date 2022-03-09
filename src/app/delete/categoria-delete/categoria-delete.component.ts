import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = new Categoria()
  idCategoria: number

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private rout: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
  }
  this.idCategoria = this.rout.snapshot.params['id']
  this.findByIdTema(this.idCategoria)
}

findByIdTema(id: number){
  this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
    this.categoria = resp
  })
}
apagar(){
  this.categoriaService.deleteCategoria(this.idCategoria).subscribe(()=>{
    alert('Categoria apagada com sucesso')
    this.router.navigate(['/categoria'])
  })
}
}
