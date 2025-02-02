import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadorUpdateComponent } from './organizador-update.component';

describe('OrganizadorUpdateComponent', () => {
  let component: OrganizadorUpdateComponent;
  let fixture: ComponentFixture<OrganizadorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizadorUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizadorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
