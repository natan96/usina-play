import { Component, ViewChild } from '@angular/core';
import { PersonalOnlineComponent } from 'src/app/components/personal-online/personal-online.component';
import { ProgramasComponent } from 'src/app/components/programas/programas.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  @ViewChild('personalOnline') personalOnline!: PersonalOnlineComponent;
  @ViewChild('programas') programas!: ProgramasComponent;

  async handleRefresh(event: any) {
    try {
      await Promise.all([
        this.personalOnline.refresh(),
        this.programas.refresh(),
      ]);
    } finally {
      event.target.complete();
    }
  }
}
