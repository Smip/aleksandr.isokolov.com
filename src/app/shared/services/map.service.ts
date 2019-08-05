import { Injectable } from '@angular/core';
import { BaseApi } from '../core/base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapProperties } from '../models/MapProperties.model';
import { map } from 'rxjs/operators';
import { latLng } from 'leaflet';


@Injectable()
export class MapService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getMap(slug): Observable<{ map: MapProperties }> {
    return this.get(`map/${slug}`)
               .pipe(
                 map(response => (
                   {
                     map: new MapProperties(
                       response.map.name,
                       response.map.slug,
                       response.map.min_zoom,
                       response.map.max_zoom,
                       response.map.zoom,
                       response.map.label_zoom,
                       latLng(response.map.center.coordinates[1], response.map.center.coordinates[0]),
                       response.map.features,
                       response.map.locked,
                     ),
                   }
                 )),
               );
  }

  getMaps(page = 1, limit = 10): Observable<{ maps: MapProperties[], total: number }> {
    return this.get(`map`, { page, limit });
  }

  newMap(name): Observable<{ slug: string }> {
    return this.put(`map`, { name });
  }

  searchOnWikimapia(data) {
    return this.get(`map/wikimapia`, data);
  }

  saveMap(slug, data) {
    return this.post(`map/${slug}`, data);
  }

}
