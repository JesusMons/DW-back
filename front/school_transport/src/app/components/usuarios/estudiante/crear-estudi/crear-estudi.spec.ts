import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstudi } from './crear-estudi';

describe('CrearEstudi', () => {
  let component: CrearEstudi;
  let fixture: ComponentFixture<CrearEstudi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEstudi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEstudi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
