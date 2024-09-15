import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDetailsComponent } from './airline-details.component';

describe('AirlineDetailsComponent', () => {
  let component: AirlineDetailsComponent;
  let fixture: ComponentFixture<AirlineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirlineDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirlineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
