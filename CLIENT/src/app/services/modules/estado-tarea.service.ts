import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from 'src/app/models/Estado';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoTareaService {

  pathURL = environment.APIURL + "estado";

  constructor(private http: HttpClient,
          private auth: AuthService) { }

  token = this.auth.getToken();

  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.token
      })
  };

  getEstados (): Observable<Estado[]> {
    return this.http.get(this.pathURL, this.httpOptions).pipe(map((resp: Estado[])=> resp));
  }
}
