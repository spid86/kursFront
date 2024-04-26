import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Mission } from './dto/Mission';
import { EditMissionComponent } from './edit-mission/edit-mission.component';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private apiUrl = environment.apiUrl;

  constructor(private dialog: MatDialog, private http: HttpClient) { }

  openMissionDialog(data?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = data ? data : null;
    dialogConfig.panelClass = 'telescope-dialog-container';
    dialogConfig.disableClose = true;

    this.dialog.open(EditMissionComponent, dialogConfig);
  }

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/missions`);
  }

  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/missions/${id}`);
  }

  createMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/missions`, mission);
  }

  updateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/missions/${mission.missionId}`, mission);
  }

  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/missions/${id}`);
  }
  getMissionsByScientistId(scientistId: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/scientists/${scientistId}/missions`);
  }
  getMissionsByVesselId(vesselId: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/vessels/${vesselId}/missions`);
  }
  getMissionsByTelescopeId(telescopeId: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/telescopes/${telescopeId}/missions`);
  }
}
