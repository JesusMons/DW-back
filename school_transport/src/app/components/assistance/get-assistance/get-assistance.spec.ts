import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAssistance } from './get-assistance';

describe('GetAssistance', () => {
  let component: GetAssistance;
  let fixture: ComponentFixture<GetAssistance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAssistance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAssistance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
