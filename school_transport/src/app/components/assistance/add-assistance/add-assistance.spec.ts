import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssistance } from './add-assistance';

describe('AddAssistance', () => {
  let component: AddAssistance;
  let fixture: ComponentFixture<AddAssistance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssistance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssistance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
