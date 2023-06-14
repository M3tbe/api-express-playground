import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatsComponent} from './cats.component';
import {RateComponent} from './rate/rate.component';
import {TopRatedComponent} from './top-rated/top-rated.component';

const routes: Routes = [
	{
		path: '',
		component: CatsComponent,
		children: [
			{path: 'rate', component: RateComponent},
			{path: 'top-rated', component: TopRatedComponent},
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CatsRoutingModule {
}
