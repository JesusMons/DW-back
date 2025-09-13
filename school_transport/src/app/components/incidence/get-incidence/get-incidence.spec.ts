import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIncidence } from './get-incidence';

describe('GetIncidence', () => {
  let component: GetIncidence;
  let fixture: ComponentFixture<GetIncidence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetIncidence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetIncidence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
