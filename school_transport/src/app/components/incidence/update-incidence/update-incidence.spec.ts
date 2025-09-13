import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncidence } from './update-incidence';

describe('UpdateIncidence', () => {
  let component: UpdateIncidence;
  let fixture: ComponentFixture<UpdateIncidence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateIncidence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateIncidence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
