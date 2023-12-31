import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
	{path: '', component: WelcomeComponent},
	{path: 'cats', loadChildren: () => import('./cats/cats.module').then(m => m.CatsModule)},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
