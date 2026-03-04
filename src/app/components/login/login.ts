import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  userId   = '';
  password = '';
  error    = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.error = '';

    const success = this.authService.login(this.userId, this.password);

    if (success) {
      const role = this.authService.getRole();

      if (role === 'Student') {
        this.router.navigate(['/student/dashboard']);
      } else if (role === 'Teacher') {
        this.router.navigate(['/teacher/dashboard']);
      } else if (role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      }
    } else {
      this.error = 'Invalid credentials. Please try again.';
    }
  }
}