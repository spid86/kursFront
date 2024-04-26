import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientistsListComponent } from './scientists-list.component';

describe('ScientistsListComponent', () => {
  let component: ScientistsListComponent;
  let fixture: ComponentFixture<ScientistsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientistsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScientistsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
