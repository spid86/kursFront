import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScientistComponent } from './edit-scientist.component';

describe('EditScientistComponent', () => {
  let component: EditScientistComponent;
  let fixture: ComponentFixture<EditScientistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditScientistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditScientistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
