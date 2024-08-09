import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
