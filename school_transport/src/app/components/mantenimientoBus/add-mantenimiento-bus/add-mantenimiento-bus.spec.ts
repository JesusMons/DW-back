import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMantenimientoBus } from './add-mantenimiento-bus';

describe('AddMantenimientoBus', () => {
  let component: AddMantenimientoBus;
  let fixture: ComponentFixture<AddMantenimientoBus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMantenimientoBus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMantenimientoBus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
