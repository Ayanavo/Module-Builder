// import { isDevMode } from '@angular/core';
// import {
//   ActionReducer,
//   ActionReducerMap,
//   createFeatureSelector,
//   createSelector,
//   MetaReducer
// } from '@ngrx/store';

import {createReducer, on} from "@ngrx/store";
import {decrement, increment, reset} from "../counter.action";
import {initialState} from "../counter.state";

// export interface State {

// }

// export const reducers: ActionReducerMap<State> = {

// };

// export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

const _counterReducer = createReducer(
    initialState,
    on(increment, (state) => {
        return {...state, counter: state.counter++};
    }),
    on(decrement, (state) => {
        return {...state, counter: state.counter--};
    }),
    on(reset, (state) => {
        return {...state, counter: 0};
    })
);
export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action);
}
