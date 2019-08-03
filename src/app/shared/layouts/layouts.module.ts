import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { NgxMaterialize } from '@smip/ngx-materialize';
import { TeximateModule } from 'ngx-teximate';

@NgModule({
  imports: [CommonModule, RouterModule, TranslateModule, NgxMaterialize, TeximateModule],
  declarations: [FooterComponent, HeaderComponent, WrapperComponent],
  exports: [FooterComponent, HeaderComponent, WrapperComponent],
})
export class LayoutsModule {}
