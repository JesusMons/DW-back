import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRoute } from './get-route';

describe('GetRoute', () => {
  let component: GetRoute;
  let fixture: ComponentFixture<GetRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
