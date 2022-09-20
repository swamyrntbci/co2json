import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenComponent } from './Green.component';

describe('DisplayComponent', () => {
  let component: GreenComponent;
  let fixture: ComponentFixture<GreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
