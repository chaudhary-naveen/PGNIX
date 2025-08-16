import { configureStore } from "@reduxjs/toolkit";
import { persistStore , persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

// Slice Based Imports
import userReducer from "./slices/userSlice";

// Setup
const persistConfig = {
    key:"persist-key",
    storage
}

// Combine all the imported Reducers
const reducer = combineReducers({ 
    user: userReducer
});
 
// Setup
const persistedReducer = persistReducer(persistConfig,reducer); 
const appStore = configureStore({
    reducer: persistedReducer
});

export default appStore;