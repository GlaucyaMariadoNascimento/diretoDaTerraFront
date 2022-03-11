import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
    ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };
  }

  getAllProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>('https://diretodaterra.herokuapp.com/produto/all')
  }

  getByIdProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`https://diretodaterra.herokuapp.com/produto/${id}`)
  }

  getByNomeProduto(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`https://diretodaterra.herokuapp.com/produto/nome/${nome}`)
  }

  postProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>('https://diretodaterra.herokuapp.com/produto', produto, this.token)
  }

  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('https://diretodaterra.herokuapp.com/produto', produto, this.token)
  }

  deleteProduto(id: number) {
    return this.http.delete(`https://diretodaterra.herokuapp.com/produto/${id}`, this.token)
  }
}
