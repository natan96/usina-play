import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { HomePage } from './home.page';

import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HomePageRoutingModule,
    TopbarComponent,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
