import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalOnlineListPage } from './personal-online-list.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalOnlineListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalOnlineListPageRoutingModule {}
