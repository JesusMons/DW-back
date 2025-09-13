import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMantenimientoBus } from './update-mantenimiento-bus';

describe('UpdateMantenimientoBus', () => {
  let component: UpdateMantenimientoBus;
  let fixture: ComponentFixture<UpdateMantenimientoBus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMantenimientoBus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMantenimientoBus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
