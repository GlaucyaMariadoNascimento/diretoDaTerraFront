import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/userLogin';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';


@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()


  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scrollTo(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: UserLogin)=> {
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome =this.userLogin.nome
      environment.foto= this.userLogin.foto
      environment.id = this.userLogin.id
      environment.tipo = this.userLogin.tipo

      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.id)
      console.log(environment.tipo)

      this.router.navigate(['inicio'])
    },
    error: erro =>{
      if(erro.status == 500) {
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
      }
      }
    })

  }

}

