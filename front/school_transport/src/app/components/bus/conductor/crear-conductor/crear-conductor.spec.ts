import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConductor } from './crear-conductor';

describe('CrearConductor', () => {
  let component: CrearConductor;
  let fixture: ComponentFixture<CrearConductor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearConductor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearConductor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
