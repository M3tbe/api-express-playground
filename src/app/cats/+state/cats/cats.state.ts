import {Action, State, StateContext} from '@ngxs/store';
import {CatsApiService} from '../../cats-api.service';
import {Injectable} from '@angular/core';
import {LoadCats, LoadRandomCat, RateCat} from './cats.actions';
import {finalize, tap} from 'rxjs/operators';
import {CATS_STATE_TOKEN, CatStateModel, getCatStateModel} from './cats.model';
import {addOrReplace } from '../../../store.utils';


/**
 * https://www.ngxs.io/concepts/state
 */

@State({
	name: CATS_STATE_TOKEN,
	defaults: getCatStateModel()
})
@Injectable()
export class CatsState {

	constructor(private catsApiService: CatsApiService) {}

	/**
	 *
	 * @description
	 * State listen to actions via an @Action decorator. The action decorator accepts an action class or an array of action classes.
	 *
	 * Action listener is the pattern which is similar to Reducer pattern in the Redux which also combines
	 * ngrx Effect pattern. Main purpose of the action listener is listen to action and change the state
	 *
	 * context state <StateContext<CatStateModel>> has a slice pointer and a function exposed to set the state.
	 * It's important to note that the getState() method will always return the freshest state slice from
	 * the global store each time it is accessed.
	 *
	 */

	@Action(LoadCats)
	public loadCats(ctx: StateContext<CatStateModel>) {
		const state = { ...ctx.getState() };
		ctx.patchState({...state, ...{loading: true}})
		return this.catsApiService.getListTop$().pipe(
				tap((res) => {
					// function which does the state mutation
					addOrReplace(ctx,  res.cats);
				}),
				finalize(() => {
					ctx.patchState( {loading: false})
				})
			)
	}

	@Action(LoadRandomCat)
	public loadRandomCat(ctx: StateContext<CatStateModel>, action: LoadRandomCat) {
		return this.catsApiService.getRandomCat$();
	}

	@Action(RateCat)
	public rateCat(ctx: StateContext<CatStateModel>, action: RateCat) {
		return this.catsApiService.postRateCat$(action.payload)
	}
}
