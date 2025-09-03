import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarItinerario } from './editar-itinerario';

describe('EditarItinerario', () => {
  let component: EditarItinerario;
  let fixture: ComponentFixture<EditarItinerario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarItinerario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarItinerario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
