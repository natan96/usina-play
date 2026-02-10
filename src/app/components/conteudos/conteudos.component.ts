import { Component } from '@angular/core';

interface ContentCard {
  selected: boolean;
}

@Component({
  selector: 'app-conteudos',
  templateUrl: './conteudos.component.html',
  styleUrls: ['./conteudos.component.scss'],
  standalone: false,
})
export class ConteudosComponent {
  contentCards: ContentCard[] = [
    { selected: true },
    { selected: false },
    { selected: false },
  ];
}
