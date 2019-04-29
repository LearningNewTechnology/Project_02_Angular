import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPwdComponent } from './components/reset-pwd/reset-pwd.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'feed', component: PostFeedComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: 'reset', component: ResetPwdComponent },
  { path: 'account/reset', redirectTo: 'reset' },
  { path: 'login/reset', component: ResetPwdComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
