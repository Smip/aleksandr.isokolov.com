import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '@shared/services/map.service';
import { MapProperties } from '@shared/models/MapProperties.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss'],
})
export class MapSelectorComponent implements OnInit, OnDestroy {
  maps: MapProperties[];
  total: number;
  page: number;
  form: FormGroup;

  constructor(private _maps: MapService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.getMapList();
    this.form = this.getForm();
  }

  getMapList(page: number = 1) {
    this.page = page;
    this._maps.getMaps(page).pipe(untilDestroyed(this)).subscribe(response => {
      this.maps = response.maps;
      this.total = response.total;
    });
  }

  getForm(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this._maps.newMap(this.form.value.name).pipe(untilDestroyed(this)).subscribe(response => {
      this.router.navigate(['/map-editor', response.slug]);
    });
  }

  ngOnDestroy(): void {
  }

}
