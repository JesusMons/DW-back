import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItinerary } from './update-itinerary';

describe('UpdateItinerary', () => {
  let component: UpdateItinerary;
  let fixture: ComponentFixture<UpdateItinerary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateItinerary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateItinerary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
