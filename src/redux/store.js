import { createStore } from "redux";
import allreducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, allreducers);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
