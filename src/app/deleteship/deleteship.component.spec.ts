import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteshipComponent } from './deleteship.component';

describe('DeleteshipComponent', () => {
  let component: DeleteshipComponent;
  let fixture: ComponentFixture<DeleteshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
