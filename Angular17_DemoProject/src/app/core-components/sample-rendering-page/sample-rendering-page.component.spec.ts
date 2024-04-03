import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRenderingPageComponent } from './sample-rendering-page.component';

describe('SampleRenderingPageComponent', () => {
  let component: SampleRenderingPageComponent;
  let fixture: ComponentFixture<SampleRenderingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleRenderingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SampleRenderingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
