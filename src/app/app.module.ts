import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importa HttpClientModule y HTTP_INTERCEPTORS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Importa tu interceptor
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { CreateshipComponent } from './components/createship/createship.component';
import { GiveshipsComponent } from './components/giveships/giveships.component';
import { CreatetripComponent } from './components/createtrip/createtrip.component';
import { GettripsComponent } from './components/gettrips/gettrips.component';
import { UpdateshipComponent } from './components/updateship/updateship.component';
import { UpdatetripComponent } from './components/updatetrip/updatetrip.component';
import { OrganizadorgettripComponent } from './components/organizadorgettrip/organizadorgettrip.component';
import { OrganizadorUpdateComponent } from './components/organizador-update/organizador-update.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    LogoutComponent,
    UpdateuserComponent,
    CreateshipComponent,
    GiveshipsComponent,
    CreatetripComponent,
    GettripsComponent,
    UpdateshipComponent,
    UpdatetripComponent,
    OrganizadorgettripComponent,
    OrganizadorUpdateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
