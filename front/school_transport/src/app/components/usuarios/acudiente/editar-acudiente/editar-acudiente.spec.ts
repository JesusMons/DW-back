import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAcudiente } from './editar-acudiente';

describe('EditarAcudiente', () => {
  let component: EditarAcudiente;
  let fixture: ComponentFixture<EditarAcudiente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAcudiente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAcudiente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
