import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HeaderComponent} from './components/header/header.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {CatsState} from './cats/+state/cats/cats.state';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		WelcomeComponent
	],
	imports: [
		BrowserModule,
		NgxsModule.forRoot([CatsState], {
			developmentMode: !environment.production
		}),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		HttpClientModule,
		AppRoutingModule,
		FontAwesomeModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
