import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmicBodiesListComponent } from './cosmic-bodies-list.component';

describe('CosmicBodiesListComponent', () => {
  let component: CosmicBodiesListComponent;
  let fixture: ComponentFixture<CosmicBodiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CosmicBodiesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CosmicBodiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
