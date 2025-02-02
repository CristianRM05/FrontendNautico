import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberGuard } from './guards/member.guard';
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
import { OrganizationGuard } from './guards/organization.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent ,  canActivate: [AuthGuard] },
  {path:"logout",component:LogoutComponent , canActivate: [AuthGuard]},
  {path:"updateuser",component:UpdateuserComponent , canActivate: [AuthGuard]},
  {path:"createShip",component:CreateshipComponent , canActivate: [AuthGuard, MemberGuard]},
  {path:"ships",component:GiveshipsComponent , canActivate: [AuthGuard , MemberGuard]},
  {path:"createTrip",component:CreatetripComponent , canActivate: [AuthGuard, MemberGuard]},
  {path:"trip",component:GettripsComponent , canActivate: [AuthGuard], },
  {path:"tripOrganizador",component:OrganizadorgettripComponent , canActivate: [OrganizationGuard]},
  { path: 'update-trip/:idTrip', component: OrganizadorUpdateComponent , canActivate: [OrganizationGuard]},

  { path: 'updateship/:id', component: UpdateshipComponent , canActivate: [AuthGuard]},
  { path: 'updatetrip/:id', component: UpdatetripComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
