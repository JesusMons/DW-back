import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inscribirse } from './inscribirse';

describe('Inscribirse', () => {
  let component: Inscribirse;
  let fixture: ComponentFixture<Inscribirse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inscribirse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inscribirse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
