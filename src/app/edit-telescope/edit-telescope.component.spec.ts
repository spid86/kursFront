import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTelescopeComponent } from './edit-telescope.component';

describe('EditTelescopeComponent', () => {
  let component: EditTelescopeComponent;
  let fixture: ComponentFixture<EditTelescopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTelescopeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTelescopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
