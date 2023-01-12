import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { images } from "../../images";

const initialState = {
    favList: [],
}


export const getImageData = createAsyncThunk(
    'getImageData',
    async => {
        return images
    }

);


const favoriteImageSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFav: (state, action) => {
            console.log('action', [...state.favList, action.payload])
            let temp = [...state.favList, ...action.payload]
            state.favList = temp
        },
        removeFromFav: (state, action) => {
            state.favList = [...action.payload]
        },
        clearAll: (state, action) => {

        }
    },
    extraReducers: builder => {
        builder.addCase(getImageData.pending, (state, action) => {

        });
        builder.addCase(getImageData.fulfilled, (state, action) => {
            console.log('action', action.payload)


        });
        builder.addCase(getImageData.rejected, (state, action) => {

        });
    },
})


export const { addToFav, removeFromFav, clearAll } = favoriteImageSlice.actions




export default favoriteImageSlice.reducer