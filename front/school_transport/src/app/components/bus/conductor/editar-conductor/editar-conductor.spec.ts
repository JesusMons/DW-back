import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConductor } from './editar-conductor';

describe('EditarConductor', () => {
  let component: EditarConductor;
  let fixture: ComponentFixture<EditarConductor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarConductor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarConductor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
