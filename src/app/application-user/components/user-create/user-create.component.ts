import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationUserService } from '../../services/application-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  userForm!: FormGroup;
  isSubmitting = false;
  successMsg = '';
  errorMsg = '';
  showPassword = false;
  showConfirmPassword = false;
  imagePreview: string | null = null;

  // ← edit mode ke liye
  isEditMode = false;
  editUserId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: ApplicationUserService,
    private router: Router,
    private route: ActivatedRoute  // ← add karo
  ) {}

  ngOnInit(): void {
    this.buildForm();

    // ← check karo edit mode hai ya nahi
    this.editUserId = this.route.snapshot.paramMap.get('id');
    if (this.editUserId) {
      this.isEditMode = true;
      this.loadUserData(this.editUserId);
    }
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', this.isEditMode ? [] : [Validators.required]],
      phoneNumber: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      address: [''],
      profileImage: ['']
    }, { validators: this.isEditMode ? null : this.passwordMatchValidator });
  }

  loadUserData(id: string): void {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber || '',
          address: user.address || '',
          profileImage: user.profileImage || ''
        });
        if (user.profileImage) {
          this.imagePreview = user.profileImage;
        }
        // edit mode mein password required nahi
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('confirmPassword')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
        this.userForm.get('confirmPassword')?.updateValueAndValidity();
      },
      error: () => {
        this.errorMsg = 'Failed to load user data.';
      }
    });
  }

  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.userForm.patchValue({ profileImage: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  get f() { return this.userForm.controls; }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMsg = '';
    this.successMsg = '';

    const { confirmPassword, ...dto } = this.userForm.value;

    if (this.isEditMode && this.editUserId) {
      // ← UPDATE
      this.userService.updateUser(this.editUserId, dto).subscribe({
        next: () => {
          this.successMsg = 'User updated successfully!';
          this.isSubmitting = false;
          setTimeout(() => this.router.navigate(['/users/dashboard']), 1500);
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Update failed.';
          this.isSubmitting = false;
        }
      });
    } else {
      // ← CREATE
      this.userService.register(dto).subscribe({
        next: () => {
          this.successMsg = 'User created successfully!';
          this.isSubmitting = false;
          setTimeout(() => this.router.navigate(['/users/dashboard']), 1500);
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Something went wrong.';
          this.isSubmitting = false;
        }
      });
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.imagePreview = null;
    this.successMsg = '';
    this.errorMsg = '';
  }


}
