import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CosmicBody } from './dto/CosmicBody';
import { EditCosmicBodyComponent } from './edit-cosmic-body/edit-cosmic-body.component';

@Injectable({
  providedIn: 'root'
})
export class CosmicBodyService {

  private apiUrl = environment.apiUrl;

  constructor(private dialog: MatDialog, private http: HttpClient) { }

  openCosmicBodyDialog(data?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = data ? data : null;
    dialogConfig.panelClass = 'telescope-dialog-container';
    dialogConfig.disableClose = true;

    this.dialog.open(EditCosmicBodyComponent, dialogConfig);
  }

  getCosmicBodies(): Observable<CosmicBody[]> {
    return this.http.get<CosmicBody[]>(`${this.apiUrl}/cosmic-bodies`);
  }

  getCosmicBodyById(id: number): Observable<CosmicBody> {
    return this.http.get<CosmicBody>(`${this.apiUrl}/cosmic-bodies/${id}`);
  }

  createCosmicBody(cosmicBody: CosmicBody): Observable<CosmicBody> {
    return this.http.post<CosmicBody>(`${this.apiUrl}/cosmic-bodies`, cosmicBody);
  }

  updateCosmicBody(cosmicBody: CosmicBody): Observable<CosmicBody> {
    return this.http.put<CosmicBody>(`${this.apiUrl}/cosmic-bodies/${cosmicBody.bodyId}`, cosmicBody);
  }

  deleteCosmicBody(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cosmic-bodies/${id}`);
  }
  getBodiesByMissionId(missionId: number): Observable<CosmicBody[]> {
    return this.http.get<CosmicBody[]>(`${this.apiUrl}/missions/${missionId}/cosmic-body`);
  }
}
