import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetItinerary } from './get-itinerary';

describe('GetItinerary', () => {
  let component: GetItinerary;
  let fixture: ComponentFixture<GetItinerary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetItinerary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetItinerary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
