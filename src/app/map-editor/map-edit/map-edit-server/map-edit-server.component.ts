import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '@shared/services/map.service';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-map-edit-mock',
  templateUrl: './map-edit-server.component.html',
  styleUrls: ['./map-edit-server.component.scss'],
})
export class MapEditServerComponent implements OnInit, OnDestroy {

  slug: string;
  mapName: string;
  mapLocked: boolean;

  constructor(private _map: MapService,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.slug = params['slug'];
      this.loadMap();
    });

  }

  loadMap() {
    if (this.slug) {
      this._map.getMap(this.slug).pipe(
        untilDestroyed(this),
      ).subscribe(response => {
        this.mapName = response.map.name;
        this.mapLocked = response.map.locked;
      });
    }

  }

  ngOnDestroy(): void {
  }

}
