import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRA } from './get-ra';

describe('GetRA', () => {
  let component: GetRA;
  let fixture: ComponentFixture<GetRA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetRA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetRA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
