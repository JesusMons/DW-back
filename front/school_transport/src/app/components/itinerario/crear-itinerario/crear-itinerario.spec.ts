import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearItinerario } from './crear-itinerario';

describe('CrearItinerario', () => {
  let component: CrearItinerario;
  let fixture: ComponentFixture<CrearItinerario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearItinerario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearItinerario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
