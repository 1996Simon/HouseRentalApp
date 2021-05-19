import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1', 
      'Manhattan Mansion', 
      'In the heart of New York City', 
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/73/10/c0.jpg', 
      1499.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p2', 
      'L\'Amour Toujours', 
      'A romantic place in Paris!', 
      'https://wallpaperaccess.com/full/203323.jpg', 
      999.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p3', 
      'Oslo Apartment', 
      'Random apartment in this shithole of a city', 
      'https://i1.wp.com/ghanaembassyoslo.no/wp-content/uploads/2019/03/cropped-oslo-skyline.jpg?ssl=1', 
      599.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    )
  ]) ;

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) { }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)};
    })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this.places.pipe(take(1)).subscribe(places => {
      setTimeout(() => {
        this._places.next(places.concat(newPlace));
      }, 1000);
    });
  }
}
