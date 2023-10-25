import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as detailsReducer } from "./detailsReducer/reducer";
import thunk from "redux-thunk";

const allReducers=combineReducers({
    detailsReducer
})

export const store=legacy_createStore(allReducers,applyMiddleware(thunk))