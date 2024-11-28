import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'dfnsFormat'
})
export class DfnsFormatPipe implements PipeTransform {
  transform(value: any, dateFormat: string): string {
    if (!value) {
      return '';
    }

    const date = typeof value === 'string' ? new Date(value) : value;

    return format(date, dateFormat);
  }
}
