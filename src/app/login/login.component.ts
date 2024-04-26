import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any)=>{
        //console.log(response)
        localStorage.setItem('role', response.role);
        this.authService.setCurrentUserRole(response.role);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.snackBar.open('Login failed. Please try again.', 'Close', {
          duration: 5000, // Duration in milliseconds
          panelClass: ['snackbar-error'] // Optional: Add custom styling
        });
      }
      
       
    })
  }
}
