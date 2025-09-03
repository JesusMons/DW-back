import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarItinerario } from './mostrar-itinerario';

describe('MostrarItinerario', () => {
  let component: MostrarItinerario;
  let fixture: ComponentFixture<MostrarItinerario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarItinerario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarItinerario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
