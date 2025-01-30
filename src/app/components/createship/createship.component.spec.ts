import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateshipComponent } from './createship.component';

describe('CreateshipComponent', () => {
  let component: CreateshipComponent;
  let fixture: ComponentFixture<CreateshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
