import {Component, OnInit} from '@angular/core';
import {faCat} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	faCat = faCat;

	constructor() {
	}

	ngOnInit(): void {
	}

}
