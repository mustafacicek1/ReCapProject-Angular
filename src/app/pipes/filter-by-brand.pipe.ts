import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterByBrand'
})
export class FilterByBrandPipe implements PipeTransform {

  transform(value: Car[], filterId: number): Car[] {
    return filterId?value.filter((c:Car)=>c.brandId===filterId):value
  }

}
