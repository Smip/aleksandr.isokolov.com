import { LatLng } from 'leaflet';
import { Feature } from './GeoFeature.model';

export class MapProperties {
  constructor(
    public name: string,
    public slug?: string,
    public minZoom?: number,
    public maxZoom?: number,
    public zoom?: number,
    public labelZoom?: number,
    public center?: LatLng,
    public features?: Feature[],
    public locked?: boolean,
    public features_count?: number,
    public updated_at?: string,
    public created_at?: string,
  ) {
  }
}






