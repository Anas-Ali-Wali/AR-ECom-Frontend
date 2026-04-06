import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponentComponent } from './components/main-layout.component/main-layout.component.component';

const routes: Routes = [
    {
    path: '',
    component: MainLayoutComponentComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

            {
        path: 'users',
        loadChildren: () =>
          import('../application-user/application-user.module')
            .then(m => m.ApplicationUserModule)
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
