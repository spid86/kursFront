import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CosmicBody } from '../dto/CosmicBody';
import { CosmicBodyService } from '../cosmic-body.service';

@Component({
  selector: 'app-edit-cosmic-body',
  standalone: true,
  imports: [MatInputModule,FormsModule,MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
  providers: [MatDatepickerModule],
  templateUrl: './edit-cosmic-body.component.html',
  styleUrl: './edit-cosmic-body.component.scss'
})
export class EditCosmicBodyComponent implements OnInit {
  cosmicBody: CosmicBody = {
    bodyId: 0,
    bodyName: '',
    bodyType: ''
  };

  constructor(
    public dialogRef: MatDialogRef<EditCosmicBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cosmicBodyService: CosmicBodyService
    
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.cosmicBody = { ...this.data }; // Use spread operator to create a new object
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.cosmicBody.bodyId) {
      this.cosmicBodyService.updateCosmicBody(this.cosmicBody).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.cosmicBodyService.createCosmicBody(this.cosmicBody).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
