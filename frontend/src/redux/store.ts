// Redux toolkit
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// Reducers
import themeReducer from 'src/redux/themeReducer'

// Redux persist
import storage from 'redux-persist/lib/storage'
import sessionStorage from 'redux-persist/lib/storage/session'

import { persistReducer, persistStore } from 'redux-persist'
import searchHistory from 'src/redux/searchHistoryReducer'
import history from 'src/redux/historyReducer';
import favoritesReducer from 'src/redux/favoritesReducer'
import modalsReducer from 'src/redux/modalsReducer'
import temperatureUnit from './temperatureUnitReducer'
import confinement from './confinementReducer'

const rootConfig = {
  key: 'root',
  storage,
  whitelist: [
    'theme',
    'temperatureUnit',
    'history',
    'searchHistory',
    'favorites',
  ],
  blacklist: ['confinements', 'modalsReducer'],
}

const confinementConfig = {
  key: 'confinements',
  storage: sessionStorage,
}

const rootReducer = combineReducers({
  theme: themeReducer,
  confinements: persistReducer(confinementConfig, confinement),
  temperatureUnit,
  searchHistory,
  history,
  favorites: favoritesReducer,
  modals: modalsReducer,
})

const persistedReducer = persistReducer(rootConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
