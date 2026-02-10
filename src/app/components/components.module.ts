import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ConteudosComponent } from './conteudos/conteudos.component';
import { PersonalOnlineComponent } from './personal-online/personal-online.component';
import { ProgramasComponent } from './programas/programas.component';

@NgModule({
  declarations: [
    PersonalOnlineComponent,
    ProgramasComponent,
    ConteudosComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [PersonalOnlineComponent, ProgramasComponent, ConteudosComponent],
})
export class ComponentsModule {}
