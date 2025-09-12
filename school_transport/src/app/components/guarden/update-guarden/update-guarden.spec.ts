import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGuarden } from './update-guarden';

describe('UpdateGuarden', () => {
  let component: UpdateGuarden;
  let fixture: ComponentFixture<UpdateGuarden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGuarden]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGuarden);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
