import { Component } from '@angular/core';

interface ContentCard {
  selected: boolean;
  text: string;
}

@Component({
  selector: 'app-conteudos',
  templateUrl: './conteudos.component.html',
  styleUrls: ['./conteudos.component.scss'],
  standalone: false,
})
export class ConteudosComponent {
  contentCards: ContentCard[] = [
    { selected: true, text: 'Exercícios em casa' },
    { selected: false, text: 'Dicas de alimentação' },
    { selected: false, text: 'Meditação e relaxamento' },
  ];
}
