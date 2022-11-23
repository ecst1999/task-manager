import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.APIURL + "auth/";

  constructor(private http: HttpClient,
            private router: Router) {}

  public isLoged(): boolean {
    
    const token = localStorage.getItem('x-token');

    if(token != null)    
      return true
    return false;
  }

  setToken(data:any){
    localStorage.setItem('x-token', data);
  }

  getToken(){    
    return localStorage.getItem('x-token');
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}login`, data);
  }

  logout(){
    localStorage.removeItem('x-token');
    this.router.navigate(['/login']);
  }
}
