import {CatStateModel} from './cats/+state/cats/cats.model';
import {StateContext} from '@ngxs/store';
import {createDraft, finishDraft} from 'immer';

export interface State {
	cats: CatStateModel
}

export interface EntityModel {
	id: string
}

export interface EntityStateModel<T extends EntityModel> {
	ids: Array<string>;
	entities: Record<string, T>;
	active: string | null;
	loading: boolean;
}

export function addOrReplace<T extends EntityModel>(
	ctx: StateContext<EntityStateModel<T>>,
	payload: T | Array<T>,
) {

	const state: EntityStateModel<T> = createDraft(ctx.getState()) as EntityStateModel<T>;
	let mutatedState: EntityStateModel<T> = {} as EntityStateModel<T>
	const entities = payload instanceof Array ? payload : [payload];
	for (const entity of entities) {
		state.ids.push(entity.id);
		state.entities[entity.id] = entity;
	}
	mutatedState = finishDraft(state);
	ctx.setState(mutatedState);
}

export function addOrUpdateEntity<T extends EntityModel>(
	ctx: StateContext<EntityStateModel<T>>,
	actionPayload: Partial<T>
) {
	const state = ctx.getState();
	// todo TASK implement the state mutation without using immer, immutable or any other similar library
	ctx.patchState(state)
}


export function setActiveEntity<T extends EntityModel>(
	ctx: StateContext<EntityStateModel<T>>,
	actionPayload: EntityStateModel<T>['active']
) {
	const state = ctx.getState();
	// todo TASK implement the state mutation without using immer, immutable or any other similar library
	ctx.patchState(state)
}
