import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from "@angular/router";
import { of, Subject, throwError } from "rxjs";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { ListOperationsComponent } from './list-operations.component';
import { ListOperationComponent } from "./../list-operation/list-operation.component";
import { DataPrepareService } from "./../services/data-prepare.service";

describe('ListOperationsComponent', () => {
  let component: ListOperationsComponent;
  let fixture: ComponentFixture<ListOperationsComponent>;

  let activatedRoute: ActivatedRoute;
  let dataPrepareService: DataPrepareService;
  let snackbar: MatSnackBar;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    const getDataSpy = jasmine.createSpyObj('DataPrepareService', ['getData']);
    const snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ListOperationsComponent, ListOperationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: DataPrepareService, useValue: getDataSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOperationsComponent);

    snackbar = fixture.debugElement.injector.get(MatSnackBar);
    dataPrepareService = fixture.debugElement.injector.get(DataPrepareService);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.queryParams = of([])

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Output Results', () => {
    it('Should get Operations', () => {
      const operations = [{value_one: 1, value_two: 5, action: "add"}];
      dataPrepareService.getData = () => {
        return of(operations)
      }
      component.ngOnInit();
      expect(component.operations).toEqual(operations)
    });

    it('Should Show Snackbar Error', () => {
      dataPrepareService.getData = () => {
        return throwError("error")
      }
      component.ngOnInit();
      expect(snackbar.open).toHaveBeenCalledWith('«Server Error»','', { duration: 10000 });
    });

    // it('Should get new operations', () => {
    //   const operations = [{value_one: 2, value_two: 10, action: "multiply"}];
    //   const subject = new Subject<Params>()
    //   activatedRoute.queryParams = subject.asObservable()
    //   DataPrepareService.getData = () => {
    //     return of(operations)
    //   }
    //   component.ngOnInit();
    //   expect(component.operations).toEqual(operations)
    // });
  });



});
