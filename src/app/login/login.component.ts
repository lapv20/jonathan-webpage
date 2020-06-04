import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '@services/database/database.service';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    input_email: new FormControl('test@test.com', Validators.required),
    input_password: new FormControl('12345678', Validators.required),
  });

  constructor(
    private userService: UserService,
    private dbServ: DatabaseService,
    private router: Router
  ) {
    console.log('I am the constructor');
  }

  ngOnInit() {
    // if (this.userService.isAuthenticated) {
    //   this.router.navigate(['admin']);
    // }
  }

  login() {
    console.warn('Init session attempt');
    if (this.loginForm.valid) {
      console.warn(this.loginForm.value);
      if (this.userService.checkAdminGivenCredentials(this.loginForm.value.input_email, this.loginForm.value.input_password)) {
        this.userService.isAuthenticated = true;
        // redirec to admin
        this.router.navigate(['admin']);
      } else {
        this.userService.isAuthenticated = false;
      }
    } else {
      // Use feedback to say some fields are missing or are incorrect
    }
  }

}
