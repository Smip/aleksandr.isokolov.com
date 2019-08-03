import { NgModule } from '@angular/core';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export function metaFactory(translate: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string): Observable<string | Object> => translate.get(key),
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'Aleksandr Sokolov',
    defaults: {
      title: 'Aleksandr Sokolov',
      description: 'Angular developer',
      'og:site_name': 'Aleksandr Sokolov',
      'og:type': 'website',
      'og:locale': 'ru_RU',
      'og:locale:alternate': [
        { code: 'en', name: 'English', culture: 'en-US' },
        { code: 'ru', name: 'Русский', culture: 'ru-RU' },
      ]
        .map((lang: any) => lang.culture)
        .toString(),
    },
  });
}

@NgModule({
  imports: [
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: metaFactory,
      deps: [TranslateService],
    }),
  ],
})
export class SharedMetaModule {}
