import { GeoJsonObject } from 'geojson';

export class Feature {
  constructor(
    public name: string,
    public feature: GeoJsonObject,
    public layerId?: number,
    public id?: number,
  ) {
  }
}








