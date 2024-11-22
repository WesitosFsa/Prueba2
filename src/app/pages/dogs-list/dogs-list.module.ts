import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogsListPageRoutingModule } from './dogs-list-routing.module';

import { DogsListPage } from './dogs-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogsListPageRoutingModule
  ],
  declarations: [DogsListPage]
})
export class DogsListPageModule {}
