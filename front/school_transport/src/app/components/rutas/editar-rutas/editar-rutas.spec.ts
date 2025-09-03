import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRutas } from './editar-rutas';

describe('EditarRutas', () => {
  let component: EditarRutas;
  let fixture: ComponentFixture<EditarRutas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRutas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRutas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
