import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEstudi } from './mostrar-estudi';

describe('MostrarEstudi', () => {
  let component: MostrarEstudi;
  let fixture: ComponentFixture<MostrarEstudi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarEstudi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarEstudi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
