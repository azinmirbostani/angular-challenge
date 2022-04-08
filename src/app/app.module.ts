import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule  } from "@angular/material/snack-bar";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListOperationsComponent } from './list-operations/list-operations.component';
import { ListOperationComponent } from './list-operation/list-operation.component';

@NgModule({
  declarations: [
    AppComponent,
    ListOperationsComponent,
    ListOperationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
