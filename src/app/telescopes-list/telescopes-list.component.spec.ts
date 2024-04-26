import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopesListComponent } from './telescopes-list.component';

describe('TelescopesListComponent', () => {
  let component: TelescopesListComponent;
  let fixture: ComponentFixture<TelescopesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelescopesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelescopesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
