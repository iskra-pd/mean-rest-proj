import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: LoginComponent },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'users/:username', component: UserDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	RouterModule.forRoot(routes)
  ],
  exports: [
	[RouterModule]
  ]
})
export class AppRoutingModule { }
