import { Component } from '@angular/core';
import { ApplicationUserService } from '../../services/application-user.service';
import { ApplicationUser } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
users: ApplicationUser[] = [];
  filteredUsers: ApplicationUser[] = [];
  isLoading = true;
  errorMsg = '';
  searchQuery = '';
  deletingId: string | null = null;

  constructor(
    private userService: ApplicationUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load users.';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(u =>
      u.fullName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }

  // ← name click hone par edit page pe jao
  editUser(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(id: string): void {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.deletingId = id;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.filteredUsers = this.filteredUsers.filter(u => u.id !== id);
        this.deletingId = null;
      },
      error: () => { this.deletingId = null; }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

}
