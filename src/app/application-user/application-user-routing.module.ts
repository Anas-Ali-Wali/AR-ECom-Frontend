import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserCreateComponent } from './components/user-create/user-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'create', component: UserCreateComponent },
    { path: 'edit/:id', component: UserCreateComponent }, // ← same component, edit mode


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationUserRoutingModule { }
