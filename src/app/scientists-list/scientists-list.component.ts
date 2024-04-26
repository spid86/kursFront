import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Scientist } from '../dto/Scientist';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ScientistService } from '../scientist.service';

@Component({
  selector: 'app-scientists-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scientists-list.component.html',
  styleUrl: './scientists-list.component.scss'
})
export class ScientistsListComponent implements OnInit {
  scientists: Scientist[] = []; // Initialize an array of Scientist objects
  telescopeId: number | undefined;
  missionId: number | undefined;
  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog,
    private scientistService: ScientistService) { }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.telescopeId = params['telescopeId'];
        this.missionId = params['missionId'];
        this.loadScientists();
      });
    }
    loadScientists(): void {
      if (this.telescopeId) {
        this.scientistService.getScientistsByTelescopeId(this.telescopeId).subscribe(scientists => {
          this.scientists = scientists;
        });
      }else if(this.missionId) {
        this.scientistService.getScientistsByMissionId(this.missionId).subscribe(scientists => {
          this.scientists = scientists;
        })
      }else {
        // Load all scientists if telescopeId is not provided
        this.scientistService.getScientists().subscribe(scientists => {
          this.scientists = scientists;
        });
      }
    }
    onDelete(scientistId: number, index: number): void {
      this.scientistService.deleteScientist(scientistId).subscribe(() => {
        this.scientists.splice(index, 1);
      })
    }

  goToMissions(scientistId: number): void {
    // Navigate to missions list passing scientistId as parameter
    this.router.navigate(['/missions'], { queryParams: { scientistId: scientistId } });
  }

  goToTelescopes(scientistId: number): void {
    // Navigate to telescopes list passing scientistId as parameter
    this.router.navigate(['/telescopes'], { queryParams: { scientistId: scientistId } });
  }
  editScientist(scientist: Scientist): void {
    this.scientistService.openScientistDialog(scientist);
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadScientists(); 
    });
  }
  isRoutedFromTelescopeList(): boolean {
    // Check if the telescopeId query parameter is present
    return this.telescopeId !== undefined && this.telescopeId !== null;
  }
  addNewScientist(): void {
    this.scientistService.openScientistDialog();
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadScientists(); 
    });
  }
  addExistingScientistsToTelescope(): void {
    // Method to add existing scientists to telescope
  }
}
