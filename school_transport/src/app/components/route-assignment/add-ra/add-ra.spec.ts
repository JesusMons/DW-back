import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRA } from './add-ra';

describe('AddRA', () => {
  let component: AddRA;
  let fixture: ComponentFixture<AddRA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
