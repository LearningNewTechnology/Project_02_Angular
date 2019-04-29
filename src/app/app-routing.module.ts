import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPwdComponent } from './components/reset-pwd/reset-pwd.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'feed', component: PostFeedComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: 'reset', component: ResetPwdComponent },
  { path: 'login/reset', component: ResetPwdComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
