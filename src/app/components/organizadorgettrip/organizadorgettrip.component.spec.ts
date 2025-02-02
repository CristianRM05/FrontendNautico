import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadorgettripComponent } from './organizadorgettrip.component';

describe('OrganizadorgettripComponent', () => {
  let component: OrganizadorgettripComponent;
  let fixture: ComponentFixture<OrganizadorgettripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizadorgettripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizadorgettripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
