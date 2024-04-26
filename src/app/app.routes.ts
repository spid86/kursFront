import { RouterModule, Routes } from '@angular/router';
import { ScientistsListComponent } from './scientists-list/scientists-list.component';
import { MissionsListComponent } from './missions-list/missions-list.component';
import { TelescopesListComponent } from './telescopes-list/telescopes-list.component';
import { VesselsListComponent } from './vessels-list/vessels-list.component';
import { CosmicBodiesListComponent } from './cosmic-bodies-list/cosmic-bodies-list.component';
import { EditScientistComponent } from './edit-scientist/edit-scientist.component';
import { EditMissionComponent } from './edit-mission/edit-mission.component';
import { EditTelescopeComponent } from './edit-telescope/edit-telescope.component';
import { EditVesselComponent } from './edit-vessel/edit-vessel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [{ path: 'home', component: HomeComponent, canActivate: [authGuard] },
{ path: 'scientists', component: ScientistsListComponent,canActivate: [authGuard] },
{ path: 'missions', component: MissionsListComponent, canActivate: [authGuard] },
{ path: 'telescopes', component: TelescopesListComponent, canActivate: [authGuard] },
{ path: 'vessels', component: VesselsListComponent, canActivate: [authGuard] },
{ path: 'cosmic-bodies', component: CosmicBodiesListComponent, canActivate: [authGuard] },
{ path: 'scientists/new', component: EditScientistComponent, canActivate: [authGuard] },
{ path: 'missions/new', component: EditMissionComponent,canActivate: [authGuard] },
{ path: 'telescopes/new', component: EditTelescopeComponent,canActivate: [authGuard] },
{ path: 'vessels/new', component: EditVesselComponent,canActivate: [authGuard] },
{ path: 'cosmic-bodies/new', component: CosmicBodiesListComponent,canActivate: [authGuard] },
{ path: '' , redirectTo: 'home', pathMatch: 'full'},
{ path: 'login', component: LoginComponent },
{ path: '**', component: PageNotFoundComponent},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

