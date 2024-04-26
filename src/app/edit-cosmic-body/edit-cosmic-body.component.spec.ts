import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCosmicBodyComponent } from './edit-cosmic-body.component';

describe('EditCosmicBodyComponent', () => {
  let component: EditCosmicBodyComponent;
  let fixture: ComponentFixture<EditCosmicBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCosmicBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCosmicBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
