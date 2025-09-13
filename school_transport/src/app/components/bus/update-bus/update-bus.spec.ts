import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBus } from './update-bus';

describe('UpdateBus', () => {
  let component: UpdateBus;
  let fixture: ComponentFixture<UpdateBus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
