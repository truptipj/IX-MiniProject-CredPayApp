import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/service/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  logIn() {
    this.loginService.loginPostData(this.loginForm.value).subscribe(
      (res) => {
        if (res.token) {
          this.authService.setToken(res.token);
          this.toastr.success('Login Successful..!');
          this.router.navigate(['user']);
        }
      },
      (err: any) => {
        this.toastr.error('Please Enter Valid Username & Pssword ..!');
      }
    );
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
