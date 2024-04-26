import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTelescopeComponent } from './edit-telescope/edit-telescope.component';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Telescope } from './dto/Telescope';
@Injectable({
  providedIn: 'root'
})
export class TelescopeService {
  private apiUrl = environment.apiUrl;

  constructor(private dialog: MatDialog, private http: HttpClient) { }
  openTelescopeDialog(data?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = data ? data : null;
    dialogConfig.panelClass = 'telescope-dialog-container';
    dialogConfig.disableClose = true;

    dialogConfig.data = data;

    this.dialog.open(EditTelescopeComponent, dialogConfig);
  }
  getTelescopes(): Observable<Telescope[]> {
    return this.http.get<Telescope[]>(`${this.apiUrl}/telescopes`);
  }

  getTelescopeById(id: number): Observable<Telescope> {
    return this.http.get<Telescope>(`${this.apiUrl}/telescopes/${id}`);
  }

  createTelescope(telescope: Telescope): Observable<Telescope> {
    return this.http.post<Telescope>(`${this.apiUrl}/telescopes`, telescope);
  }

  updateTelescope(telescope: Telescope): Observable<Telescope> {
    return this.http.put<Telescope>(`${this.apiUrl}/telescopes/${telescope.telescopeId}`, telescope);
  }

  deleteTelescope(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/telescopes/${id}`);
  }
  getTelescopesByScientistId(scientistId: number): Observable<Telescope[]> {
    return this.http.get<Telescope[]>(`${this.apiUrl}/scientists/${scientistId}/telescopes`);
  }
  getTelescopeByMissionId(missionId: number): Observable<Telescope> {
    return this.http.get<Telescope>(`${this.apiUrl}/missions/${missionId}/telescope`);
  }
}
