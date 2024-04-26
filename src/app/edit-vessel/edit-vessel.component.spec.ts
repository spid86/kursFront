import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVesselComponent } from './edit-vessel.component';

describe('EditVesselComponent', () => {
  let component: EditVesselComponent;
  let fixture: ComponentFixture<EditVesselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVesselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
