import { combineReducers } from "redux";
import authSliceReducer from "./slices/authSlice";
import favoriteImageSlice from "./slices/favoriteImageSlice";


export default combineReducers({
    auth: authSliceReducer,
    fav: favoriteImageSlice,
})

