import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main-layout.component',
  templateUrl: './main-layout.component.component.html',
  styleUrls: ['./main-layout.component.component.css']
})
export class MainLayoutComponentComponent {
  fullName = '';

  constructor(private authService: AuthService) {
    this.fullName = this.authService.getFullName();
  }

  logout(): void {
    this.authService.logout();
  }
}
