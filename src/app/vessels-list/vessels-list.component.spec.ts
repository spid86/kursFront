import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselsListComponent } from './vessels-list.component';

describe('VesselsListComponent', () => {
  let component: VesselsListComponent;
  let fixture: ComponentFixture<VesselsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VesselsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VesselsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
