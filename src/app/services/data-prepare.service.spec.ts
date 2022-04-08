import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { DataPrepareService } from './data-prepare.service';
import { Number, Action } from './../models/data.model'

const numbers: Number[] = [
  { value: 1, action: "add" },
  { value: 2, action: "multiply" },
]

const actionValue = {
  add: 5,
  multiply: 10
}

describe('DataPrepareService', () => {
  let service: DataPrepareService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataPrepareService,
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataPrepareService);
  });

  it('Should return ArrayNumber', () => {
    const numbers: Number[] = [{value: 1, action: "add"}, {value: 2, action: "multiply"}]
    service.readNumbersFile().subscribe(data =>
      expect(data).toEqual(numbers)
    );
    const req = httpMock.expectOne(service.url_numbers);
    expect(req.request.method).toEqual('GET');
    req.flush(numbers);
    httpMock.verify();
  });

  it('Should return Action\'s Value', () => {
    const add: Action = { value: 1 }
    const multiply: Action = { value: 2 }
    service.getActionValue().subscribe(data =>
      expect(data).toEqual({ add:1, multiply:2 })
    );
    const addReq = httpMock.expectOne(service.url_add);
    expect(addReq.request.method).toEqual('GET');
    addReq.flush(add);

    const mulReq = httpMock.expectOne(service.url_multiply);
    expect(mulReq.request.method).toEqual('GET');
    mulReq.flush(multiply);
    httpMock.verify();
  });

  it('Should return <MISSING DATA>', () => {
    service.getActionValue().subscribe(data =>
      expect(data).toEqual({ add:'<MISSING DATA>', multiply:'<MISSING DATA>' })
    );
    const addRequest = httpMock.expectOne(service.url_add);
    expect(addRequest.request.method).toEqual('GET');
    addRequest.flush("", { status: 404, statusText: 'Not Found' });

    const multiplyRequest = httpMock.expectOne(service.url_multiply);
    expect(multiplyRequest.request.method).toEqual('GET');
    multiplyRequest.flush("", { status: 404, statusText: 'Not Found' });
    httpMock.verify();
  });

});
