import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Scientist } from '../dto/Scientist';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTelescopeComponent } from '../edit-telescope/edit-telescope.component';
import { ScientistService } from '../scientist.service';

@Component({
  selector: 'app-edit-scientist',
  standalone: true,
  imports: [MatInputModule,FormsModule,MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
  providers: [MatDatepickerModule],
  templateUrl: './edit-scientist.component.html',
  styleUrl: './edit-scientist.component.scss'
})
export class EditScientistComponent implements OnInit {
  scientist:Scientist = {
    scientistId: 0,
    scientistName: '',
    specialization: '',
    numberOfCuratedMissions: 0,
    status: ''
  }
  constructor(
    public dialogRef: MatDialogRef<EditTelescopeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private scientistService: ScientistService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.scientist = { ...this.data }; // Use spread operator to create a new object
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.scientist.scientistId) {
      this.scientistService.updateScientist(this.scientist).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.scientistService.createScientist(this.scientist).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
