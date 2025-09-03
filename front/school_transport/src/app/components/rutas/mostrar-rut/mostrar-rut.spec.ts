import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRut } from './mostrar-rut';

describe('MostrarRut', () => {
  let component: MostrarRut;
  let fixture: ComponentFixture<MostrarRut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarRut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
