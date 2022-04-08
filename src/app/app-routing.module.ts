import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListOperationsComponent } from './list-operations/list-operations.component';

const routes: Routes = [
  { path: '', component: ListOperationsComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
