import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonInputBoxComponent } from './common-input-box.component';

describe('CommonInputBoxComponent', () => {
  let component: CommonInputBoxComponent;
  let fixture: ComponentFixture<CommonInputBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonInputBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
