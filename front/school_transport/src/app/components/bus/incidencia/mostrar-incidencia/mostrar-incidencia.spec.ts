import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarIncidencia } from './mostrar-incidencia';

describe('MostrarIncidencia', () => {
  let component: MostrarIncidencia;
  let fixture: ComponentFixture<MostrarIncidencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarIncidencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarIncidencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
