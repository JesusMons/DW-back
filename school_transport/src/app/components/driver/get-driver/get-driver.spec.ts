import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDriver } from './get-driver';

describe('GetDriver', () => {
  let component: GetDriver;
  let fixture: ComponentFixture<GetDriver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDriver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDriver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
