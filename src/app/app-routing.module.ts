import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/AuthGuard/AuthGuard';

const routes: Routes = [
     {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard],  // ← login nahi to andar nahi
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
   imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
