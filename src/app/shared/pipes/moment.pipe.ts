import { Pipe, PipeTransform } from '@angular/core';

declare const moment: any;

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {

  transform(value: string, formatTo: string = 'YYYY-MM-DD HH:mm:ss', formatPrevYear?: string): string {
    if (formatPrevYear && !moment().isSame(value, 'year')) {
      return moment(value).local().format(formatPrevYear);
    }
    return moment(value).local().format(formatTo);
  }

}
