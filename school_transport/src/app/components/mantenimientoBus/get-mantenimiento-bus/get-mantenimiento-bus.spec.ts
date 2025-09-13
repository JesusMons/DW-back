import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMantenimientoBus } from './get-mantenimiento-bus';

describe('GetMantenimientoBus', () => {
  let component: GetMantenimientoBus;
  let fixture: ComponentFixture<GetMantenimientoBus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMantenimientoBus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMantenimientoBus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
