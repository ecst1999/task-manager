import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Tarea } from 'src/app/models/Tarea';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/models/Categoria';
import { Estado } from 'src/app/models/Estado';


@Injectable({
  providedIn: 'root'
})
export class TareaService {

  pathURL = environment.APIURL + "tarea";
  constructor(private http: HttpClient,
    private auth: AuthService) { }

  token = this.auth.getToken();

  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.token
      })
  };

  getTareas(): Observable<Tarea[]>{
    return this.http.get(this.pathURL, this.httpOptions).pipe(
      map((resp: Tarea[]) => resp));
  }

  getTarea(idTarea: String): Observable<Tarea> {
    return this.http.get(`${this.pathURL}/${idTarea}`, this.httpOptions).pipe(
      map((resp: Tarea) => resp));
  }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get(`${environment.APIURL}categoria`, this.httpOptions).pipe(
      map((resp: Categoria[]) => resp)
    );
  }

  getEstados(): Observable<Estado[]> {
    return this.http.get(`${environment.APIURL}estado`, this.httpOptions).pipe(
      map((resp: Estado[]) => resp)
    );
  }

  postTarea(tarea: any): Observable<Tarea> {
    return this.http.post(this.pathURL, tarea, this.httpOptions).pipe(
      map((resp: Tarea) => resp)
    );
  }

  patchTarea(tarea: any, idTarea: String): Observable<Tarea> {
    return this.http.patch(`${this.pathURL}/${idTarea}`,tarea, this.httpOptions).pipe(
      map((resp: Tarea) => resp)
    );
  }

  deleteTarea(idTarea: String): Observable<Tarea> {
    return this.http.delete(`${this.pathURL}/${idTarea}`, this.httpOptions).pipe(
      map((resp: Tarea) => resp)
    );
  }
  
}