
import { MomentDateModule } from '@angular/material-moment-adapter';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Telescope } from '../dto/Telescope';
import { MatNativeDateModule } from '@angular/material/core';
import { TelescopeService } from '../telescope.service';

@Component({
  selector: 'app-edit-telescope',
  standalone: true,
  imports: [MatInputModule,FormsModule,MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
  providers: [MatDatepickerModule],
  templateUrl: './edit-telescope.component.html',
  styleUrl: './edit-telescope.component.scss'
  
})
export class EditTelescopeComponent implements OnInit {
  telescope: Telescope = {
    telescopeId: 0,
    telescopeType: '',
    telescopeLaunchDate: new Date(),
    mirrorSize: 0,
    observedArea: ''
  };
  constructor(
    public dialogRef: MatDialogRef<EditTelescopeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private telescopeService: TelescopeService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.telescope = { ...this.data }; // Use spread operator to create a new object
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.telescope.telescopeId) {
      this.telescopeService.updateTelescope(this.telescope).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.telescopeService.createTelescope(this.telescope).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
