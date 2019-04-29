import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngMaterialsModule } from './modules/ang-materials/ang-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './components/register/register.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { ResetPwdComponent } from './components/reset-pwd/reset-pwd.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { PostComponent } from './components/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from './services/database.service';
import { PublicFeedComponent } from './components/public-feed/public-feed.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ErrorComponent } from './components/error/error.component';

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
    PostComponent,
    PublicFeedComponent,
    SearchComponent,
    SearchResultComponent,
    ErrorComponent
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
