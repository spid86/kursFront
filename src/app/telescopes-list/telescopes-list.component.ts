import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Telescope } from '../dto/Telescope';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TelescopeService } from '../telescope.service';

@Component({
  selector: 'app-telescopes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './telescopes-list.component.html',
  styleUrl: './telescopes-list.component.scss'
})
export class TelescopesListComponent implements OnInit {
  telescopes: Telescope[] = []; // Initialize an array of Telescope objects
  scientistId: number | undefined;
  missionId: number | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog,
    private telescopeService: TelescopeService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.scientistId = params['scientistId'];
      this.missionId = params['missionId'];
      this.loadTelescopes();
    });
  }
  loadTelescopes(): void {
    if (this.scientistId) {
      this.telescopeService.getTelescopesByScientistId(this.scientistId).subscribe(telescopes => {
        this.telescopes = telescopes;
      });
    }else if (this.missionId) {
      this.telescopeService.getTelescopeByMissionId(this.missionId).subscribe(telescopes => {
        this.telescopes = [telescopes];
      });
    } else {
    this.telescopeService.getTelescopes().subscribe(telescopes => {
      this.telescopes = telescopes;
    })
    };
  }
  onDelete(telescopeId: number, index: number): void {
    this.telescopeService.deleteTelescope(telescopeId).subscribe(() => {
      this.telescopes.splice(index, 1);
    })
  }

  goToMissions(telescopeId: number): void {
    this.router.navigate(['/missions'], { queryParams: { telescopeId: telescopeId } });
  }

  goToScientists(telescopeId: number): void {
    this.router.navigate(['/scientists'], { queryParams: { telescopeId: telescopeId } });
  }
  editTelescope(telescope: Telescope): void {
    this.telescopeService.openTelescopeDialog(telescope);
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadTelescopes(); 
    });
  }
  addNewTelescope(): void {
    this.telescopeService.openTelescopeDialog();
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadTelescopes(); 
    });
  }
}
