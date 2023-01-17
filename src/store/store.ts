import {compose, createStore, applyMiddleware, Middleware} from "redux";
import {logger} from "redux-logger";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import {rootReducer} from "./root-reducer";
import createSagaMiddleware from 'redux-saga';

// @ts-ignore
import {rootSaga} from "./root-saga";
import {PersistConfig} from "redux-persist/es/types";

export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnchanser = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhansers = composeEnchanser(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhansers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);

