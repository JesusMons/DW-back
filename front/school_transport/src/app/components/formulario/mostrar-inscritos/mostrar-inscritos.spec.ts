import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarInscritos } from './mostrar-inscritos';

describe('MostrarInscritos', () => {
  let component: MostrarInscritos;
  let fixture: ComponentFixture<MostrarInscritos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarInscritos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarInscritos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
