import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  currentUserRole: string | null | undefined

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role')
    if(!!role){
      this.currentUserRole = role
    }
    else{
      this.authService.currentUserRole$.subscribe(role => {
        this.currentUserRole = role;
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
