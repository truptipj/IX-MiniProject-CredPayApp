import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/core/service/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  get registerControl() {
    return this.registerForm.controls;
  }

  public onSubmit(): void {
    this.registerService.registerPostData(this.registerForm.value).subscribe(
      (res) => {
        this.toastr.success('Registered Successfully..!');
        this.router.navigate(['login']);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  openLogin() {
    this.router.navigate(['login']);
  }
}
