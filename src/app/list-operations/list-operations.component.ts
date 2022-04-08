import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

import { Operation } from "./../models/data.model";
import { DataPrepareService } from "./../services/data-prepare.service";

@Component({
  selector: 'app-list-operations',
  templateUrl: './list-operations.component.html',
  styleUrls: ['./list-operations.component.css']
})
export class ListOperationsComponent implements OnInit, OnDestroy {
  subscribe: Subscription | undefined;
  operations: Operation[] = [];

  constructor(private route: ActivatedRoute, private data: DataPrepareService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.subscribe = this.route.queryParams.subscribe(() => {
      this.data.getData().subscribe(
        async (operations) => {
          this.operations = operations
        },
        (err): void => {
          this.snackbar.open('«Server Error»', '', {
            duration: 10000
          })
        }
      );
    })
  }

  ngOnDestroy() {
    // @ts-ignore
    this.subscribe.unsubscribe()
  }

}