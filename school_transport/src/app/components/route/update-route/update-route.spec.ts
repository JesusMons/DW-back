import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoute } from './update-route';

describe('UpdateRoute', () => {
  let component: UpdateRoute;
  let fixture: ComponentFixture<UpdateRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
