import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from '../dto/Mission';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-missions-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missions-list.component.html',
  styleUrl: './missions-list.component.scss'
})
export class MissionsListComponent implements OnInit{
  missions: Mission[] = []; // Initialize an array of Mission objects
  telescopeId: number | undefined;
  vesselId: number | undefined;
  scientistId: number | undefined


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private missionService: MissionService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.scientistId = params['scientistId'];
      this.telescopeId = params['telescopeId'];
      this.vesselId = params['vesselId'];
      this.loadMissions();
    });
  }

  loadMissions(): void {
    if (this.telescopeId) {
      this.missionService.getMissionsByTelescopeId(this.telescopeId).subscribe(missions => {
        this.missions = missions;
      });
    }else if(this.vesselId){
      this.missionService.getMissionsByVesselId(this.vesselId).subscribe(missions => {
        this.missions = missions;
      });
    }else if(this.scientistId){
      this.missionService.getMissionsByScientistId(this.scientistId).subscribe(missions => {
        this.missions = missions;
      });
    }else {
      this.missionService.getMissions().subscribe(missions => {
        this.missions = missions;
      });
    }
    
  }

  onDelete(missionId: number, index: number): void {
    this.missionService.deleteMission(missionId).subscribe(() => {
      this.missions.splice(index, 1);
    })
  }

  editMission(mission: Mission): void {
    this.missionService.openMissionDialog(mission);
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadMissions();
    });
  }

  addNewMission(): void {
    this.missionService.openMissionDialog();
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadMissions();
    });
  }
  goToScientists(missionId: number): void {
    // Navigate to scientists list passing missionId as parameter
    this.router.navigate(['/scientists'], { queryParams: { missionId: missionId } });
  }

  goToCosmicBodies(missionId: number): void {
    // Navigate to cosmic bodies list passing missionId as parameter
    this.router.navigate(['/cosmic-bodies'], { queryParams: { missionId: missionId } });
  }

  goToTelescope(missionId: number): void {
    // Navigate to telescope passing missionId as parameter
    this.router.navigate(['/telescopes'], { queryParams: { missionId: missionId } });
  }

  goToVessel(missionId: number): void {
    // Navigate to vessel passing missionId as parameter
    this.router.navigate(['/vessels'], { queryParams: { missionId: missionId } });
  }
}
