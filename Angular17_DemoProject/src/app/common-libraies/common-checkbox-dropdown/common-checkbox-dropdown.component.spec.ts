import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCheckboxDropdownComponent } from './common-checkbox-dropdown.component';

describe('CommonCheckboxDropdownComponent', () => {
  let component: CommonCheckboxDropdownComponent;
  let fixture: ComponentFixture<CommonCheckboxDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonCheckboxDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonCheckboxDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
