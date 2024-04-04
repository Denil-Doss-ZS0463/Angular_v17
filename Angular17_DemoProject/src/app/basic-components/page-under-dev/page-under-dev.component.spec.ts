import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnderDevComponent } from './page-under-dev.component';

describe('PageUnderDevComponent', () => {
  let component: PageUnderDevComponent;
  let fixture: ComponentFixture<PageUnderDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageUnderDevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageUnderDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
