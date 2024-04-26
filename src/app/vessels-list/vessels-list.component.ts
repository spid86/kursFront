import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vessel } from '../dto/Vessel';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VesselService } from '../vessel.service';

@Component({
  selector: 'app-vessels-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vessels-list.component.html',
  styleUrl: './vessels-list.component.scss'
})
export class VesselsListComponent implements OnInit{
  vessels: Vessel[] = [];
  missionId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private vesselService: VesselService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.missionId = params['missionId'];
      this.loadVessels();
    });
  }

  loadVessels(): void {
    if (this.missionId) {
      this.vesselService.getVesselByMissionId(this.missionId).subscribe(vessels => {
        this.vessels = [vessels];
      });
    } else {
    this.vesselService.getVessels().subscribe(vessels => {
      this.vessels = vessels;
    })
    };
  }

  onDelete(vesselId: number, index: number): void {
    this.vesselService.deleteVessel(vesselId).subscribe(() => {
      this.vessels.splice(index, 1);
    })
  }

  goToMissions(vesselId: number): void {
    this.router.navigate(['/missions'], { queryParams: { vesselId: vesselId } });
  }

  editVessel(vessel: Vessel): void {
    this.vesselService.openVesselDialog(vessel);
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadVessels(); 
    });
  }

  addNewVessel(): void {
    this.vesselService.openVesselDialog();
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadVessels(); 
    });
  }
}
