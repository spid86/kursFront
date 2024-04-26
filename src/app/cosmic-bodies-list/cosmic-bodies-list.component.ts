import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CosmicBodyService } from '../cosmic-body.service';
import { CosmicBody } from '../dto/CosmicBody';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cosmic-bodies-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cosmic-bodies-list.component.html',
  styleUrl: './cosmic-bodies-list.component.scss'
})
export class CosmicBodiesListComponent implements OnInit {
  cosmicBodies: CosmicBody[] = [];
  missionId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private cosmicBodyService: CosmicBodyService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.missionId = params['missionId'];
      this.loadCosmicBodies();
    });
  }

  loadCosmicBodies(): void {
    if(this.missionId){
      this.cosmicBodyService.getBodiesByMissionId(this.missionId).subscribe(cosmicBodies => {
        this.cosmicBodies = cosmicBodies;
      });
    }else {
      this.cosmicBodyService.getCosmicBodies().subscribe(cosmicBodies => {
        this.cosmicBodies = cosmicBodies;
      });
  }
}

  editCosmicBody(cosmicBody: CosmicBody): void {
    this.cosmicBodyService.openCosmicBodyDialog(cosmicBody);
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadCosmicBodies();
    });
  }

  addNewCosmicBody(): void {
    this.cosmicBodyService.openCosmicBodyDialog();
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadCosmicBodies();
    });
  }

  onDelete(cosmicBodyId: number, index: number): void {
    this.cosmicBodyService.deleteCosmicBody(cosmicBodyId).subscribe(() => {
      this.cosmicBodies.splice(index, 1);
    })
  }
  goToMissions(scientistId: number): void {
    // Navigate to missions list passing scientistId as parameter
    this.router.navigate(['/missions'], { queryParams: { scientistId: scientistId } });
  }
}
