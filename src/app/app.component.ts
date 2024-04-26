import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MissionsListComponent } from './missions-list/missions-list.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { VesselService } from './vessel.service';
import { TelescopeService } from './telescope.service';
import { MissionService } from './mission.service';
import { ScientistService } from './scientist.service';
import { CosmicBodyService } from './cosmic-body.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MenuComponent } from "./menu/menu.component";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    providers: [AuthService, VesselService, TelescopeService, MissionService, ScientistService, CosmicBodyService,],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MenuComponent, NgIf]
})
export class AppComponent {
  title = 'kursFront';
  isAuthenticated(){
    return !!localStorage.getItem('token')
  }
}
