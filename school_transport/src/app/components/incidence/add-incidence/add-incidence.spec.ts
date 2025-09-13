import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidence } from './add-incidence';

describe('AddIncidence', () => {
  let component: AddIncidence;
  let fixture: ComponentFixture<AddIncidence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIncidence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIncidence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
