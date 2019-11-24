import {Component, OnInit} from '@angular/core';
import {EMPTY, interval, Observable} from 'rxjs';
import {switchMap, map, catchError} from 'rxjs/operators';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  counter1: Observable<string>;
  counter2: Observable<string>;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.counter1 = interval(1000)
      .pipe(
        switchMap((index: number) => {
          return this.appService.getCount(index)
            .pipe(
              map((res: {data: string}) => res.data)
            );
        })
      );

    this.counter2 = interval(1000)
      .pipe(
        switchMap((index: number) => {
          return this.appService.getCount(index)
            .pipe(
              catchError(error => {
                console.error(error);

                return EMPTY;
              }),
              map((res: {data: string}) => res.data)
            );
        })
      );
  }
}
