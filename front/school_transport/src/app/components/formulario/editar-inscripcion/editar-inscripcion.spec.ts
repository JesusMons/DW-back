import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInscripcion } from './editar-inscripcion';

describe('EditarInscripcion', () => {
  let component: EditarInscripcion;
  let fixture: ComponentFixture<EditarInscripcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarInscripcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarInscripcion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
