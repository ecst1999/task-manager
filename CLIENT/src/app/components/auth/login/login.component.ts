import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]],
    recordar: [false]
  });

  submitted = false;
  authError = false;


  constructor(private fb: FormBuilder,
            private authService: AuthService,
            private router: Router,
            ) {         
  }

  ngOnInit(): void {    
  }

  login(){
    this.submitted = true;

    if (this.formulario.invalid)  return;

    if(this.formulario.valid)
    {
      this.authService.login(this.formulario.value).subscribe(resp => {
        this.authError = false;        
        this.authService.setToken(resp.token);
        this.router.navigate(['/']);
      }, (error: HttpErrorResponse) => {
        this.authError = true;
        if(error.status === 400){
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: error.error['msg']
          });          

          this.formulario.reset();
        }
      });      
    }else{
      this.authError = true;
    }
  }

}
