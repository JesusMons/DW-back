import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAcudiente } from './mostrar-acudiente';

describe('MostrarAcudiente', () => {
  let component: MostrarAcudiente;
  let fixture: ComponentFixture<MostrarAcudiente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarAcudiente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarAcudiente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
