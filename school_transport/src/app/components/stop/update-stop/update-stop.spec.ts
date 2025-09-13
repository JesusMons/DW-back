import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStop } from './update-stop';

describe('UpdateStop', () => {
  let component: UpdateStop;
  let fixture: ComponentFixture<UpdateStop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
