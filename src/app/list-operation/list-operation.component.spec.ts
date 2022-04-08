import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ListOperationComponent } from './list-operation.component';

describe('ListOperationComponent', () => {
  let component: ListOperationComponent;
  let fixture: ComponentFixture<ListOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Output Results', () => {
    it('Should return ADD', () => {
      component.data = { value_one: 1, value_two: 5, action: "add" }
      const result = component.resultOutput()
      expect(result).toBe('1 + 5 = 6');
    });

    it('Should return MULTIPLY', () => {
      component.data = { value_one: 2, value_two: 10, action: "multiply" }
      const result = component.resultOutput()
      expect(result).toBe('2 * 10 = 20')
    });

    it('Should return <MISSING DATA>', () => {
      component.data = { value_one: 1, value_two: "<MISSING DATA>", action: "" }
      const result = component.resultOutput()
      expect(result).toBe('<MISSING DATA>')
    });
  });

  describe('Output Display', () => {
    it('Should Display Action', () => {
      component.data = { value_one: 1, value_two: 5, action: 'add' }
      fixture.detectChanges();
      const element: DebugElement = fixture.debugElement;
      const title = element.query(By.css('mat-card-title'));
      expect(title.nativeElement.textContent).toContain('add')
    });

    it('Should Display Numbers', () => {
      component.data = { value_one: 2, value_two: 10, action: 'multiply' }
      fixture.detectChanges();
      const element: DebugElement = fixture.debugElement;
      const items = element.queryAll(By.css('mat-card-subtitle'));
      expect(items[items.length - 1].nativeElement.textContent).toContain('Number One: 2 | Number Two: 10')
    });

    it('Should Display Result', () => {
      component.data = { value_one: 2, value_two: 10, action: 'multiply' }
      fixture.detectChanges();
      const element: DebugElement = fixture.debugElement;
      const items = element.queryAll(By.css('mat-card-content p'));
      expect(items[items.length - 1].nativeElement.textContent).toContain('Output: 2 * 10 = 20')
    });

    it('Should Display <MISSING DATA>', () => {
      component.data = { value_one: 1, value_two: '', action: 'add' }
      fixture.detectChanges();
      const element: DebugElement = fixture.debugElement;
      const items = element.queryAll(By.css('mat-card-content p'));
      expect(items[items.length - 1].nativeElement.textContent).toContain('Output: <MISSING DATA>')
    });
  });

  
});
