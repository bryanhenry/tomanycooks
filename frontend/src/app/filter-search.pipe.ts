/**
 * src/app/filter-search.pipe.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com>
 * @license MIT
 * @since 04/24/2018
 *
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(value: any, args?: any): string {

    if(args !== undefined && value !== undefined && args.length !== 0) {

      return value.filter( item => {
        return item.name.toLowerCase().includes(args.toLowerCase());
      });

    } else {

      return value;

    }

  }

}
