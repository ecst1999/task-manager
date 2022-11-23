import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubTarea } from 'src/app/models/SubTarea';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubTareaService {

  pathURL = environment.APIURL + 'subtarea';

  constructor(private http: HttpClient,
            private auth: AuthService) { }

  token = this.auth.getToken();

  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.token
      })
  };

  getSubtareas(idTarea: String): Observable<SubTarea[]>{
    return this.http.get(`${this.pathURL}/tarea/${idTarea}`, this.httpOptions).pipe(map((resp: SubTarea[]) => resp));
  }

  postSubtarea(subTarea: any): Observable<SubTarea> {
    return this.http.post(this.pathURL, subTarea, this.httpOptions).pipe(
      map((resp: SubTarea) => resp)
    );
  }

  deleteSubtarea(idSubtarea: String): Observable<SubTarea> {
    return this.http.delete(`${this.pathURL}/${idSubtarea}`, this.httpOptions).pipe(
      map((resp: SubTarea) => resp)
    );
  }
}
