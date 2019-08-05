import * as geojson from 'geojson';

export class Feature {
  constructor(
    public name: string,
    public feature: geojson.FeatureCollection,
    public layerId?: number,
    public id?: number,
  ) {
  }
}








