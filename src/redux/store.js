import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../component/auth/authSlice";

import profileSlice from "../Pages/Profile/profileSlice";

// import userSlice from "../component/Notification/Events/User/userSlice";


const combineReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
});

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
