import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faMeh, faPoo, faGrinHearts } from '@fortawesome/free-solid-svg-icons';
import {
	BehaviorSubject,
	catchError,
	of,
	Subject,
	takeUntil,
	concatMap,
	filter,
	map,
	share,
	startWith,
	tap,
	withLatestFrom,
	debounceTime,
	observeOn,
	asyncScheduler,
	forkJoin,
	ReplaySubject,
} from 'rxjs';
import { Cat } from '../cat';
import { CatsApiService } from '../cats-api.service';

@Component({
	selector: 'app-rate',
	templateUrl: './rate.component.html',
	styleUrls: ['./rate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RateComponent implements OnInit, OnDestroy {
	public readonly dislikeIcon = faPoo;
	public readonly neutralIcon = faMeh;
	public readonly likeIcon = faGrinHearts;

	public showIndicator$ = new BehaviorSubject(false);
	public form: FormGroup = new FormGroup({rating: new FormControl(null)});

	private unsubscribe$ = new Subject<void>();

	cat$ = new ReplaySubject<Cat>(1);

	// Nyan cat loading
	isLoading$ = this.cat$.pipe(
		map(cat => !cat),
		startWith(null),
		share(),
	)

	constructor(private catApiService: CatsApiService) {
	}

	ngOnInit(): void {
		this.catApiService.getRandomCat$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((cat) => {
			this.cat$.next(cat);
		})

		this.form.valueChanges
			.pipe(
				map(value => value.rating),
				filter(rating => rating !== null),
				tap(() => this.showIndicator$.next(false)),
				observeOn(asyncScheduler),
				tap(() => this.showIndicator$.next(true)),
				debounceTime(3_000),
				withLatestFrom(this.cat$),
				concatMap(([rating, cat]) =>
					forkJoin([
						this.catApiService.postRateCat$({...cat, rating}),
						this.catApiService.getRandomCat$(),
					])
					.pipe(
						map(([_, newCat]) => newCat),
						catchError(e => {
							console.warn(e);
							return of(null);
						}),
					)
				),
				takeUntil(this.unsubscribe$),
			)
			.subscribe(newCat => {
				this.showIndicator$.next(false);
				this.form.setValue({rating: null});

				if (newCat) {
					this.cat$.next(newCat as Cat);
				}
			});
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
	}
}
