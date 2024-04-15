import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonChipComponent } from './common-chip.component';

describe('CommonChipComponent', () => {
  let component: CommonChipComponent;
  let fixture: ComponentFixture<CommonChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
