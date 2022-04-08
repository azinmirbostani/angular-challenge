import { Component, OnInit, Input } from '@angular/core';

import {Operation} from './../models/data.model'

@Component({
  selector: 'app-list-operation',
  templateUrl: './list-operation.component.html',
  styleUrls: ['./list-operation.component.css'],
})
export class ListOperationComponent implements OnInit {
  @Input() data: Operation = {value_one: 0, value_two: 0, action: ''}
  displayedColumns: string[] = ['valueone', 'valuetwo', 'operationresult'];

  constructor() { }

  ngOnInit(): void { }

  resultOutput() {
    if (typeof this.data.value_two === "string") {
      return '<MISSING DATA>'
    }
    if (this.data.action === 'add') {
      return this.data.value_one + ' + ' + this.data.value_two + ' = ' + (<number>this.data.value_one + <number>this.data.value_two)
    } else if(this.data.action === 'multiply') {
      return this.data.value_one + ' * ' + this.data.value_two + ' = ' + (<number>this.data.value_one * <number>this.data.value_two)
    } else {
      return ''
    }
  }

}
