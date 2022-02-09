import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbsSettingsComponent } from './verbs-settings.component';

describe('VerbsSettingsComponent', () => {
  let component: VerbsSettingsComponent;
  let fixture: ComponentFixture<VerbsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
