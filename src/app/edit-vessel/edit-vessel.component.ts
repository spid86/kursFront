import { Component, Inject, OnInit } from '@angular/core';
import { Vessel } from '../dto/Vessel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VesselService } from '../vessel.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-vessel',
  standalone: true,
  imports: [MatInputModule,FormsModule,MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
  providers: [MatDatepickerModule],
  templateUrl: './edit-vessel.component.html',
  styleUrl: './edit-vessel.component.scss'
})
export class EditVesselComponent implements OnInit {
  vessel: Vessel = {
    vesselId: 0,
    vesselName: '',
    vesselType: '',
    vesselLaunchDate: new Date(),
    vesselStatus: ''
  };

  constructor(
    public dialogRef: MatDialogRef<EditVesselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vesselService: VesselService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.vessel = { ...this.data };
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.vessel.vesselId) {
      this.vesselService.updateVessel(this.vessel).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.vesselService.createVessel(this.vessel).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}