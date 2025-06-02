import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// combineReducers: Agar multiple slices ho (user, products, cart), unko ek single reducer me combine karta hai.
// persistReducer: State ko localStorage me persist (save) karne ke liye.
// persistStore: Store ko persistable banata hai.


const rootReducer = combineReducers({ user: userReducer });


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};
// State ko localStorage me store karne ke liye persist config banaya.
// key: localStorage me data kis key ke naam se save ho.
// storage: localStorage ya sessionStorage.
// version: future compatibility ke liye.

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Redux Toolkit se store bana raha hai with:
// persistedReducer: Redux persist integration.
// getDefaultMiddleware({ serializableCheck: false }): Non-serializable data (like functions) ko allow kar raha hai jisse koi error na aaye.

export const persistor = persistStore(store);