import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBus } from './get-bus';

describe('GetBus', () => {
  let component: GetBus;
  let fixture: ComponentFixture<GetBus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetBus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
