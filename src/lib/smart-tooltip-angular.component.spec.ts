import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTooltipAngularDirective } from './smart-tooltip-angular.directive';

describe('SmartTooltipAngularDirective', () => {
  let component: SmartTooltipAngularDirective;
  let fixture: ComponentFixture<SmartTooltipAngularDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTooltipAngularDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTooltipAngularDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
