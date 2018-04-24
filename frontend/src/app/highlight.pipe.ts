/**
 * src/app/highlight.pipe.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com>
 * @license MIT
 * @since 04/24/2018
 *
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(text: string, search): string {

    if(!search) {
      return text;
    }

    let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
          .split(' ').filter((t) => {
                                      return t.length > 0;
                                    }).join('|');

    return search ? text.replace(new RegExp(pattern, 'gi'), (match) => `<strong>${match}</strong>`) : text;

  }

}
