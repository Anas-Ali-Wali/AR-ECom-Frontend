import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationUserRoutingModule } from './application-user-routing.module';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    UserCreateComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
     ReactiveFormsModule,
    HttpClientModule,
    FormsModule,        // ← yeh add karo

    ApplicationUserRoutingModule
  ]
})
export class ApplicationUserModule { }
