import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogsListPage } from './dogs-list.page';

const routes: Routes = [
  {
    path: '',
    component: DogsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogsListPageRoutingModule {}


