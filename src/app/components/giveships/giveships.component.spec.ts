import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveshipsComponent } from './giveships.component';

describe('GiveshipsComponent', () => {
  let component: GiveshipsComponent;
  let fixture: ComponentFixture<GiveshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiveshipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
