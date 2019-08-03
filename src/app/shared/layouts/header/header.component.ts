import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ILang, TranslatesService } from '@shared/translates';
import { fadeIn } from 'ng-animate';
import { TextAnimation } from 'ngx-teximate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public langList$: Observable<ILang[]>;
  public currentLang: string;
  enterAnimation: TextAnimation = {
    animation: fadeIn,
    delay: 50,
    type: 'letter',
  };

  constructor(private _translatesService: TranslatesService) {}

  ngOnInit(): void {
    this.langList$ = this._translatesService.getLangList();
    this.currentLang = this._translatesService.getCurrentLang();
  }

  public changeLang(code: string): void {
    this._translatesService.changeLang(code);
    this.currentLang = code;
  }
}
