import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1', 
      'Manhattan Mansion', 
      'In the heart of New York City', 
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/73/10/c0.jpg', 
      1499.99,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p2', 
      'L\'Amour Toujours', 
      'A romantic place in Paris!', 
      'https://wallpaperaccess.com/full/203323.jpg', 
      999.99,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),

    new Place(
      'p3', 
      'Oslo Apartment', 
      'Random apartment in this shithole of a city', 
      'https://i1.wp.com/ghanaembassyoslo.no/wp-content/uploads/2019/03/cropped-oslo-skyline.jpg?ssl=1', 
      599.99,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor() { }

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }
}
