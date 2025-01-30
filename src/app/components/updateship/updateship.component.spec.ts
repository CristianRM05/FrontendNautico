import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateshipComponent } from './updateship.component';

describe('UpdateshipComponent', () => {
  let component: UpdateshipComponent;
  let fixture: ComponentFixture<UpdateshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
