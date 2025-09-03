import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstudi } from './editar-estudi';

describe('EditarEstudi', () => {
  let component: EditarEstudi;
  let fixture: ComponentFixture<EditarEstudi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEstudi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstudi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
