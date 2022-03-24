import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario()
  userSenha: string
  tipoUsuario: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmSenha(event:any) {
    this.userSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar(){

    if(this.usuario.senha != this.userSenha){
      this.alertas.showAlertDanger('Senha incorreta!')
    } else {
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com êxito!')
      })
    }


  }


}
