import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssistance } from './update-assistance';

describe('UpdateAssistance', () => {
  let component: UpdateAssistance;
  let fixture: ComponentFixture<UpdateAssistance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAssistance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAssistance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
