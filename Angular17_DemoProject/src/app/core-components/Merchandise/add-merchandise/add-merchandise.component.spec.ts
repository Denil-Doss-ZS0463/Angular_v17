import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMerchandiseComponent } from './add-merchandise.component';

describe('AddMerchandiseComponent', () => {
  let component: AddMerchandiseComponent;
  let fixture: ComponentFixture<AddMerchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMerchandiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
