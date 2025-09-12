import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuarden } from './add-guarden';

describe('AddGuarden', () => {
  let component: AddGuarden;
  let fixture: ComponentFixture<AddGuarden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGuarden]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGuarden);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
