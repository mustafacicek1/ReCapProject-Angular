import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterByColor'
})
export class FilterByColorPipe implements PipeTransform {

  transform(value: Car[], filterId: number): Car[] {
    return filterId?value.filter((c:Car)=>c.colorId===filterId):value
  }

}
