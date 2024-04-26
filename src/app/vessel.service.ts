import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vessel } from './dto/Vessel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditVesselComponent } from './edit-vessel/edit-vessel.component';

@Injectable({
  providedIn: 'root'
})
export class VesselService {
  private apiUrl = environment.apiUrl;
  openVesselDialog(data?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = data ? data : null;
    dialogConfig.panelClass = 'telescope-dialog-container';
    dialogConfig.disableClose = true;

    this.dialog.open(EditVesselComponent, dialogConfig);
  }
  constructor(private http: HttpClient, private dialog: MatDialog) { }
  getVessels(): Observable<Vessel[]> {
    return this.http.get<Vessel[]>(`${this.apiUrl}/vessels`);
  }

  getVesselById(id: number): Observable<Vessel> {
    return this.http.get<Vessel>(`${this.apiUrl}/vessels/${id}`);
  }

  createVessel(vessel: Vessel): Observable<Vessel> {
    return this.http.post<Vessel>(`${this.apiUrl}/vessels`, vessel);
  }

  updateVessel(vessel: Vessel): Observable<Vessel> {
    return this.http.put<Vessel>(`${this.apiUrl}/vessels/${vessel.vesselId}`, vessel);
  }

  deleteVessel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vessels/${id}`);
  }
  getVesselByMissionId(missionId: number): Observable<Vessel> {
    return this.http.get<Vessel>(`${this.apiUrl}/missions/${missionId}/vessel`);
  }
}
