import {Component, OnInit} from '@angular/core';
import {CatsFacade} from '../+state/cats/cats.facade';

@Component({
	selector: 'app-top-rated',
	templateUrl: './top-rated.component.html',
	styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {

	public cats$ = this.catsFacade.cats$;
	public isLoading$ = this.catsFacade.isLoading$

	constructor(private catsFacade: CatsFacade) {}

	ngOnInit(): void {
		this.catsFacade.loadAllCats$().subscribe()
	}
}
