import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { CreateshipComponent } from './components/createship/createship.component';
import { GiveshipsComponent } from './components/giveships/giveships.component';
import { CreatetripComponent } from './components/createtrip/createtrip.component';
import { GettripsComponent } from './components/gettrips/gettrips.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent ,  canActivate: [AuthGuard] },
  {path:"logout",component:LogoutComponent , canActivate: [AuthGuard]},
  {path:"updateuser",component:UpdateuserComponent , canActivate: [AuthGuard]},
  {path:"createShip",component:CreateshipComponent , canActivate: [AuthGuard]},
  {path:"giveShips",component:GiveshipsComponent , canActivate: [AuthGuard]},
  {path:"createTrip",component:CreatetripComponent , canActivate: [AuthGuard]},
  {path:"giveTrip",component:GettripsComponent , canActivate: [AuthGuard]},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
