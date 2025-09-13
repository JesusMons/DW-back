import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRA } from './update-ra';

describe('UpdateRA', () => {
  let component: UpdateRA;
  let fixture: ComponentFixture<UpdateRA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
