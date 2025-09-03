import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIncidencia } from './editar-incidencia';

describe('EditarIncidencia', () => {
  let component: EditarIncidencia;
  let fixture: ComponentFixture<EditarIncidencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarIncidencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarIncidencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
