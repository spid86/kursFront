import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditScientistComponent } from './edit-scientist/edit-scientist.component';
import { Scientist } from './dto/Scientist';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScientistService {
  private apiUrl = environment.apiUrl;

  constructor(private dialog: MatDialog, private http: HttpClient) { }
  openScientistDialog(data?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = data ? data : null;
    dialogConfig.panelClass = 'telescope-dialog-container';
    dialogConfig.disableClose = true;

    dialogConfig.data = data;

    this.dialog.open(EditScientistComponent, dialogConfig);
  }
  getScientists(): Observable<Scientist[]> {
    return this.http.get<Scientist[]>(`${this.apiUrl}/scientists`);
  }

  getScientistById(id: number): Observable<Scientist> {
    return this.http.get<Scientist>(`${this.apiUrl}/scientists/${id}`);
  }

  createScientist(scientist: Scientist): Observable<Scientist> {
    return this.http.post<Scientist>(`${this.apiUrl}/scientists`, scientist);
  }

  updateScientist(scientist: Scientist): Observable<Scientist> {
    return this.http.put<Scientist>(`${this.apiUrl}/scientists/${scientist.scientistId}`, scientist);
  }

  deleteScientist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/scientists/${id}`);
  }
  getScientistsByTelescopeId(telescopeId: number): Observable<Scientist[]> {
    return this.http.get<Scientist[]>(`${this.apiUrl}/telescopes/${telescopeId}/scientists`);
  }
  getScientistsByMissionId(missionId: number): Observable<Scientist[]> {
    return this.http.get<Scientist[]>(`${this.apiUrl}/missions/${missionId}/scientists`);
  }
}
