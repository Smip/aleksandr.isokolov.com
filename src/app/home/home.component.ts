import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { TransferHttpService } from '@gorniv/ngx-universal';
import { MetaService } from '@ngx-meta/core';
import { UniversalStorage } from '@shared/storage/universal.storage';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [':host{background-color: #eee;}'],
})
export class HomeComponent implements OnInit {

  menu: { name: string, previewSrc: string, description: string, routerLink: string }[] = [
    {
      name: 'Map editor',
      previewSrc: '../../assets/map-editor.jpg',
      description: 'Map editor made on the Angular 8 & Leaflet. Works with Universal.',
      routerLink: '/map-editor',
    },
    {
      name: 'D3 & Angular',
      previewSrc: '../../assets/simple-d3.jpg',
      description: 'Visualization data using Angular 8 & D3',
      routerLink: '/d3',
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _http: TransferHttpService,
    private readonly _meta: MetaService,
    private _universalStorage: UniversalStorage,
    // instead window.document
    @Inject(DOCUMENT) private _document: Document,
  ) {
  }

  ngOnInit(): void {
  }
}
