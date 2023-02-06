import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContactsPageComponent } from './import-contacts-page.component';

describe('ImportContactsPageComponent', () => {
  let component: ImportContactsPageComponent;
  let fixture: ComponentFixture<ImportContactsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContactsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportContactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
