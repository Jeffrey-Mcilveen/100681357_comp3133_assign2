import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddlistingsComponent } from './admin-addlistings.component';

describe('AdminAddlistingsComponent', () => {
  let component: AdminAddlistingsComponent;
  let fixture: ComponentFixture<AdminAddlistingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddlistingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddlistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
