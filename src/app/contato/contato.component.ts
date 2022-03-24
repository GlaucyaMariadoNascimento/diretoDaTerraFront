import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  enviar(){
    this.alertas.showAlertInfo('Futuramente iremos implementar no back-end para o e-mail ser enviado')
  }
}
