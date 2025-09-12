import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGuarden } from './get-guarden';

describe('GetGuarden', () => {
  let component: GetGuarden;
  let fixture: ComponentFixture<GetGuarden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetGuarden]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetGuarden);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
