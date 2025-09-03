import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarConductor } from './mostrar-conductor';

describe('MostrarConductor', () => {
  let component: MostrarConductor;
  let fixture: ComponentFixture<MostrarConductor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarConductor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarConductor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
