import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TranslatesService, ILang } from '@shared/translates';

const LINKS: any[] = [
  { link: '/home', name: 'home', icon: 'home' },
  { link: '/mock', name: 'mock', icon: 'info_outline' },
  { link: '/static/back', name: 'static-back-http', icon: 'swap_vert' },
  { link: '/nonexistent', name: 'nonexistent', icon: 'error' }
];


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public langList$: Observable<ILang[]>;
  public currentLang: string;
  public links: any[] = [];

  constructor(private _translatesService: TranslatesService) {}

  ngOnInit(): void {
    this.langList$ = this._translatesService.getLangList();
    this.currentLang = this._translatesService.getCurrentLang();
    const linkTemp = JSON.parse(JSON.stringify(LINKS));
    this.links = linkTemp.map((link) => {
      link.name = `header.${link.name}`;
      return link;
    });
  }

  public changeLang(code: string): void {
    this._translatesService.changeLang(code);
    this.currentLang = code;
  }
}
