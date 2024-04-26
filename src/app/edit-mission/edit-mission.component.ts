import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mission } from '../dto/Mission';
import { MissionService } from '../mission.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-mission',
  standalone: true,
  imports: [MatInputModule,FormsModule,MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
  providers: [MatDatepickerModule],
  templateUrl: './edit-mission.component.html',
  styleUrl: './edit-mission.component.scss'
})
export class EditMissionComponent implements OnInit {
  mission: Mission = {
    missionId: 0,
    missionName: '',
    plannedDuration: 0,
    missionStatus: '',
    missionObjective: ''
  };

  constructor(
    public dialogRef: MatDialogRef<EditMissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private missionService: MissionService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.mission = { ...this.data }; // Use spread operator to create a new object
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.mission.missionId) {
      this.missionService.updateMission(this.mission).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.missionService.createMission(this.mission).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
