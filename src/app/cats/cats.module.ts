import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatsRoutingModule} from './cats-routing.module';
import {CatsComponent} from './cats.component';
import {RateComponent} from './rate/rate.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TopRatedComponent} from './top-rated/top-rated.component';
import {LoaderComponent} from './loader/loader.component';


@NgModule({
	declarations: [
		LoaderComponent,
		CatsComponent,
		RateComponent,
		TopRatedComponent
	],
	imports: [
		CommonModule,
		CatsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
	]
})
export class CatsModule {
}
