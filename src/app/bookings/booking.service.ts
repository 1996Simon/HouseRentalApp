import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Booking } from './booking.model';
import { delay, take, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class BookingService {
    private _bookings = new BehaviorSubject<Booking[]>([]);

    get bookings() {
        return this._bookings.asObservable();
    }

    constructor(private authService: AuthService, private http: HttpClient) { }

    addBooking(
        placeId: string,
        placeTitle: string,
        placeImage: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        dateFrom: Date,
        dateTo: Date
    ) {
        let generatedId: string;
        const newBooking = new Booking(
            Math.random().toString(),
            placeId,
            this.authService.userId,
            placeTitle,
            placeImage,
            firstName,
            lastName,
            guestNumber,
            dateFrom,
            dateTo
        );
        this.http.post<{ name: string }>(
            'https://ionic-angular-course-4ce21-default-rtdb.europe-west1.firebasedatabase.app/bookings.json',
            { ...newBooking, id: null }
        ).pipe(switchMap(resData => {
            generatedId = resData.name;
            return this.bookings;
        }), tap());
        return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
            this._bookings.next(bookings.concat(newBooking));
        })
        );
    }

    cancelBooking(bookingId: string) {
        return this.bookings.pipe(
            take(1),
            delay(1000),
            tap(bookings => {
                this._bookings.next(bookings.filter(b => b.id !== bookingId));
            })
        );
    }
}