import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngMaterialsModule } from './ang-materials/ang-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { PostComponent } from './post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from './database.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    AccountComponent,
    RegisterComponent,
    EditInfoComponent,
    ResetPwdComponent,
    PostFeedComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
