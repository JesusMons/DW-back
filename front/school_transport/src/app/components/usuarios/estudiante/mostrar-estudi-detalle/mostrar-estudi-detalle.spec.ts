import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEstudiDetalle } from './mostrar-estudi-detalle';

describe('MostrarEstudiDetalle', () => {
  let component: MostrarEstudiDetalle;
  let fixture: ComponentFixture<MostrarEstudiDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarEstudiDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarEstudiDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
