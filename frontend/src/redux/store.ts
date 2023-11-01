// Redux toolkit
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// Reducers
import themeReducer from 'src/redux/themeReducer'

// Redux persist
import storage from 'redux-persist/lib/storage'
import sessionStorage from 'redux-persist/lib/storage/session'

import { persistReducer, persistStore } from 'redux-persist'
import confinementReducer from './confinementReducer'
import temperatureUnitReducer from './temperatureUnitReducer'
import searchHistoryReducer from 'src/redux/searchHistoryReducer'
import historyReducer from 'src/redux/historyReducer'
import favoritesReducer from 'src/redux/favoritesReducer'
import modalsReducer from 'src/redux/modalsReducer'

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
  key: 'favorites',
  storage: sessionStorage,
}

const rootReducer = combineReducers({
  theme: themeReducer,
  confinements: persistReducer(confinementConfig, confinementReducer),
  temperatureUnit: temperatureUnitReducer,
  searchHistory: searchHistoryReducer,
  history: historyReducer,
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
