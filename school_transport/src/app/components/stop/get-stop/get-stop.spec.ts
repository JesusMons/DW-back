import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStop } from './get-stop';

describe('GetStop', () => {
  let component: GetStop;
  let fixture: ComponentFixture<GetStop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetStop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
