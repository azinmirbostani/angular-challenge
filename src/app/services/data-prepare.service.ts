import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, mergeMap, switchMap } from "rxjs/operators";
import {combineLatest, of } from "rxjs";

import {Number, Action, Operation} from './../models/data.model'

@Injectable({
  providedIn: 'root'
})
export class DataPrepareService {
  url_numbers = 'assets/numbers.json';
  url_add = 'assets/add.json';
  url_multiply = 'assets/multiply.json';

  constructor(private http_client: HttpClient) { }

  // get numbers.json func
  readNumbersFile () {
    return this.http_client.get<Number []>(this.url_numbers)
  }

  // get add.json func
  readAddFile () {
    return this.http_client.get<Action>(this.url_add)
              .pipe(
                map (
                  add => add.value,
                ),
              )
  }

  // get multiply.json func
  readMultiplyFile () {
    return this.http_client.get<Action>(this.url_multiply)
              .pipe(
                map (
                  multiply => multiply.value,
                ),
              )
  }

  // DataPrepareService main function
  getData() {
    return this.readNumbersFile().pipe(
      mergeMap(numbers => {
        return this.mergeNumber(numbers)
      }),
    )
  }

  // run add, multiply func
  getActionValue() {
    return combineLatest([
      this.readAddFile().pipe(catchError(() => of("<MISSING DATA>"))),
      this.readMultiplyFile().pipe(catchError(() => of("<MISSING DATA>")),)
    ]).pipe(
      map(([add, multiply])=>{
        return {add, multiply}
      })
    )
  }

  // fill operations object
  private mergeNumber(numbers: Number[]) {
    return this.getActionValue().pipe(
      map(actionValue => {
        let operations: Operation[] = [];
        for (const number of numbers) {
          if (number.action === "add") {
            operations.push({
              value_one: number.value,
              value_two: actionValue.add,
              action: "add",
            })
          } else {
            operations.push({
              value_one: number.value,
              value_two: actionValue.multiply,
              action: "multiply",
            })
          }
        }
        return operations
      })
    )
  }

}
