import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  user: Usuario = new Usuario()
  idUser: number
  confirmSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private rout: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.rout.snapshot.params['id']
    this.findByIdUser(this.idUser)
    this.authService.refreshToken();

  }

  confirmaSenha(event: any){
    this.confirmSenha = event.target.value
  }

  tipoUser(event: any){
  this.tipoUsuario = event.target.value
}

atualizar(){
  this.user.tipo = this.tipoUsuario

  if(this.user.senha != this.confirmSenha){
    alert('As senhas estão incorretas')
  } else {
    this.authService.cadastrar(this.user).subscribe((resp: Usuario)=> {
      this.user = resp
      this.router.navigate(['/entrar'])
      alert('usuario atualizado com sucesso, faça o login novamente')
      environment.token = ''
      environment.nome = ''
      environment.foto = ''
      environment.id = 0
      this.router.navigate(['/entrar'])
    })
}
}


  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario)=>{
      this.user = resp
    })
  }

}
