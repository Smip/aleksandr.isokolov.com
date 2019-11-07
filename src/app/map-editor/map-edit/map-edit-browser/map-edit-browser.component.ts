import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { featureGroup, geoJSON, icon, latLng, latLngBounds, Map, marker, Marker, polygon, tileLayer, Util } from 'leaflet';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapService } from '@shared/services/map.service';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { toast, updateTextFields } from '@smip/ngx-materialize';
import { MapProperties } from '@shared/models/MapProperties.model';
import { distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';
import stamp = Util.stamp;

declare const L: any;

@Component({
  selector: 'app-map-edit-mock',
  templateUrl: './map-edit-browser.component.html',
  styleUrls: ['./map-edit-browser.component.scss'],
})
export class MapEditBrowserComponent implements OnInit, OnDestroy {

  slug: string;
  mapName: string;
  mapLocked: boolean;
  searchString = '';
  searchResult: { distance: number, id: number, name: string, url: string, location: {}, polygon: any[] }[];
  searchLayer: any;
  searchSelectedFeature: any;

  minZoom = 3;
  maxZoom = 18;
  zoom = 3;
  labelZoom = 12;
  lastZoom: number;
  tab = 'edit';

  center = latLng(0, 0);
  centerMarker: Marker;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    ],
    zoom: this.zoom,
    zoomControl: false,
    maxBounds: latLngBounds(latLng(-90, -180), latLng(90, 180)),
    center: this.center,
  };

  geoForm: FormGroup;
  map: Map;

  featureGroup = featureGroup();
  editFeatureGroup = featureGroup();
  layers = [this.featureGroup];

  drawOptions = {
    position: 'topright',
    draw: {
      polyline: false,
      circle: false,
      rectangle: false,
      marker: false,
      circlemarker: false,
    },
    edit: {
      featureGroup: this.editFeatureGroup,
      remove: false,
    },
  };
  isSaving = false;

  constructor(private fb: FormBuilder,
              private _map: MapService,
              private renderer: Renderer2,
              private _router: Router,
              private _route: ActivatedRoute) {
  }

  get featuresControls() {
    return <FormArray>this.geoForm.get('features');
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
        console.log(response.map);
        this.zoom = response.map.zoom;
        this.center = response.map.center;
        this.centerMarker = marker(this.center, {
          icon: icon({
            iconSize: [32, 32],
            iconUrl: 'assets/centerMarker.png',
          }),
        });
        this.labelZoom = response.map.labelZoom;
        this.featureGroup.clearLayers();
        this.editFeatureGroup.clearLayers();
        response.map.features.forEach((feature) => {
          geoJSON(feature.feature, {
            onEachFeature: (feature1, layer) => {
              feature.layerId = stamp(layer);
              this.featureGroup.addLayer(layer);
              layer.on('click', l => this.onLayerClick(l));
              setTimeout(() => {
                layer.bindTooltip(feature.name,
                  { permanent: true, direction: 'center', className: 'map-tooltip' },
                ).openTooltip();
              }, 0);
            },
          });
        });
        this.geoForm = this.getForm(response.map);
        setTimeout(() => {
          updateTextFields();
        }, 0);
      }, _ => {
        this._router.navigateByUrl('404', { skipLocationChange: true });
      });
    }

  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.addControl(L.control.zoom({ position: 'topright' }));
  }


  getForm(map: MapProperties): FormGroup {
    const form = this.fb.group({
      min_zoom: [{ value: map.minZoom, disabled: true }],
      max_zoom: [{ value: map.maxZoom, disabled: true }],
      zoom: [{ value: map.zoom, disabled: true }],
      label_zoom: [{ value: map.labelZoom, disabled: true }],
      center: [{ value: map.center.lat + ', ' + map.center.lng, disabled: true }],
      features: this.fb.array([]),
    });
    map.features.forEach(feature => {
      const featureControl = this.newFeatureControl(feature.name, feature.feature, feature.layerId, true, feature.id);
      (<FormArray>form.controls.features).push(featureControl);
      this.onChangesFeature(featureControl);
    });
    return form;
  }

  newFeatureControl(name: string, feature: any, layerId: number, blocked: boolean = false, id: number = null) {
    return this.fb.group({
      name: [name, [Validators.required]],
      feature: [feature],
      layerId: [layerId],
      blocked: [blocked],
      id,
    });
  }

  onSubmit(): void {
    if (this.geoForm.invalid) {
      toast({ html: 'Form has errors' });
      return;
    }
    this.isSaving = true;
    const formValue = this.geoForm.getRawValue();
    formValue['center'] = marker(latLng(formValue['center'].split(', '))).toGeoJSON();
    this._map.saveMap(this.slug, formValue).pipe(
      untilDestroyed(this),
    ).subscribe(response => {
      this.geoForm.markAsPristine();
      toast({ html: 'Saved!' });
      this.isSaving = false;
    });
  }


  onChangesFeature(feature): void {
    feature.valueChanges.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
    ).subscribe(featureValues => {
      const layer = this.featureGroup.getLayer(featureValues.layerId);
      layer.setTooltipContent(featureValues.name);
      if (featureValues.blocked) {
        this.editFeatureGroup.removeLayer(layer);
      } else {
        this.editFeatureGroup.addLayer(layer);
      }
    });
  }

  onLayerClick(layer) {
    const layerId = stamp(layer.target);
    this.featuresControls.controls.some((fControl, index) => {
      if (fControl.value.layerId === layerId) {
        this.renderer.selectRootElement('#feature_' + index).focus();
        return true;
      }
      return false;
    });
  }

  public onDrawCreated(e: any) {
    const layer = e.layer;
    const layerId = stamp(layer);
    layer.on('click', l => this.onLayerClick(l));
    layer.bindTooltip(layerId.toString(),
      { permanent: true, direction: 'center', className: 'map-tooltip' },
    ).openTooltip();
    this.featureGroup.addLayer(layer);
    const featureControl = this.newFeatureControl(layerId.toString(), layer.toGeoJSON(), layerId);
    this.featuresControls.push(featureControl);
    const indexOfAddedControl = this.featuresControls.controls.indexOf(featureControl);
    this.onChangesFeature(featureControl);
    setTimeout(() => {
      updateTextFields();
      this.renderer.selectRootElement('#feature_' + indexOfAddedControl).focus();
    }, 0);
  }


  public onDrawEdited(e: any) {
    e.layers.getLayers().forEach(layer => {
      const layerId = stamp(layer);
      const changed = this.featuresControls.controls.some(fControl => {
        if (fControl.value.layerId === layerId) {
          fControl.patchValue({ feature: layer.toGeoJSON() });
          return true;
        }
        return false;
      });
      if (!changed) {
        toast({ html: 'Error' });
      }

    });
  }

  onDeleteLayer(layerId): void {
    Swal.fire({
      title: 'Delete area?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        const deletedIndex = this.featuresControls.controls.findIndex(fControl => fControl.value.layerId === layerId);
        if (this.editFeatureGroup.getLayer(layerId)) {
          this.editFeatureGroup.removeLayer(layerId);
        }
        this.featureGroup.removeLayer(layerId);
        this.featuresControls.removeAt(deletedIndex);
      }
    });
  }


  onZoomChanged(): void {
    const zoom = this.map.getZoom();
    if (zoom < this.labelZoom && (!this.lastZoom || this.lastZoom >= this.labelZoom)) {
      this.featureGroup.eachLayer((l) => {
        if (l.getTooltip) {
          const toolTip = l.getTooltip();
          if (toolTip) {
            this.map.closeTooltip(toolTip);
          }
        }
      });
    } else if (zoom >= this.labelZoom && (!this.lastZoom || this.lastZoom < this.labelZoom)) {
      this.featureGroup.eachLayer((l) => {
        if (l.getTooltip) {
          const toolTip = l.getTooltip();
          if (toolTip) {
            this.map.openTooltip(toolTip);
          }
        }
      });
    }
    this.lastZoom = zoom;
  }

  onSetCenter(): void {
    this.center = latLng(this.map.getCenter().lat, this.map.getCenter().lng);
    this.centerMarker = marker(this.center, {
      icon: icon({
        iconSize: [32, 32],
        iconUrl: 'assets/centerMarker.png',
      }),
    });
    this.geoForm.patchValue({
      center: this.center.lat.toFixed(5) + ', ' + this.center.lng.toFixed(5),
    });
  }

  onSetMinZoom(): void {
    if (this.map.getZoom() > this.geoForm.getRawValue()['max_zoom']) {
      toast({ html: 'The minimum zoom cannot be greater than the maximum.' });
      return;
    }
    this.geoForm.patchValue({ min_zoom: this.map.getZoom() });
  }

  onSetZoom(): void {
    if (this.map.getZoom() < this.geoForm.getRawValue()['min_zoom']) {
      toast({ html: 'Standard zoom cannot be less than the minimum.' });
      return;
    }
    if (this.map.getZoom() > this.geoForm.getRawValue()['max_zoom']) {
      toast({ html: 'Standard zoom can not be greater than the maximum.' });
      return;
    }
    this.geoForm.patchValue({ zoom: this.map.getZoom() });
  }

  onSetLabelZoom(): void {
    const zoom = this.map.getZoom();
    if (zoom < this.geoForm.getRawValue()['min_zoom']) {
      toast({ html: 'Zoom can not be less than the minimum.' });
      return;
    }
    if (zoom > this.geoForm.getRawValue()['max_zoom']) {
      toast({ html: 'Zoom can not be greater than the maximum.' });
      return;
    }
    this.geoForm.patchValue({ label_zoom: zoom });
    this.labelZoom = zoom;
    this.lastZoom = 0;
    this.onZoomChanged();
  }

  onSetMaxZoom(): void {
    if (this.map.getZoom() < this.geoForm.getRawValue()['min_zoom']) {
      toast({ html: 'The maximum zoom cannot be greater than the minimum.' });
      return;
    }
    this.geoForm.patchValue({ max_zoom: this.map.getZoom() });
  }

  ngOnDestroy(): void {
  }

  searchOnWikimapia(str): void {
    if (this.searchString !== str) {
      this.searchString = str;
      if (!str) {
        toast({ html: 'Empty query' });
        return;
      }
      this._map.searchOnWikimapia({ query: str, lat: this.center.lat, lon: this.center.lng }).subscribe((response) => {
        this.searchResult = response['areas'];
        this.tab = 'search';
      });
    }
  }

  showOnMap(feature): void {
    this.searchSelectedFeature = feature;
    this.searchLayer = polygon(feature.polygon.map((p) => latLng(p['y'], p['x'])), { color: '#ff0000' });
    this.map.flyToBounds(latLngBounds(
      latLng(feature.location.north, feature.location.west),
      latLng(feature.location.south, feature.location.east),
    ));
    setTimeout(() => {
      this.searchLayer.bindTooltip(feature.name,
        { permanent: true, direction: 'center', className: 'map-tooltip' },
      ).openTooltip();
    }, 0);
  }

  clearSearchValue(): void {
    this.searchString = '';
    this.tab = 'edit';
    this.searchLayer = false;
    this.searchSelectedFeature = false;
    setTimeout(() => {
      updateTextFields();
    }, 0);
  }

  addFeatureToMap(): void {
    const newLayer = polygon(this.searchSelectedFeature.polygon.map((p) => latLng(p['y'], p['x'])));
    const layerId = stamp(newLayer);
    const featureControl = this.newFeatureControl(this.searchSelectedFeature.name, newLayer.toGeoJSON(), layerId, true);
    this.featuresControls.push(featureControl);
    this.featureGroup.addLayer(newLayer);
    newLayer.bindTooltip(this.searchSelectedFeature.name,
      { permanent: true, direction: 'center', className: 'map-tooltip' },
    ).openTooltip();
    this.onChangesFeature(featureControl);
    this.clearSearchValue();
  }

}
