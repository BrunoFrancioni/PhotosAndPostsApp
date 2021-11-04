import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhoto } from "../../interfaces/IPhotos";

interface PhotosState {
    photos: IPhoto[];
    totalResults: number;
    actualPage: number;
}

interface InteractPhotos {
    photos: IPhoto[];
}

interface InteractTotalResults {
    totalResults: number;
}

interface InteractActualPage {
    actualPage: number;
}

const initialState: PhotosState = {
    photos: [],
    totalResults: 0,
    actualPage: 1
}

export const photosSlice = createSlice({
    name: 'photos',
    initialState: initialState,
    reducers: {
        setPhotos: (state: PhotosState,  action: PayloadAction<InteractPhotos>) => {
            state.photos = action.payload.photos;
        },
        changeTotalResults: (state: PhotosState, action: PayloadAction<InteractTotalResults>) => {
            state.totalResults = action.payload.totalResults
        },
        changeActualPage: (state: PhotosState, action: PayloadAction<InteractActualPage>) => {
            state.actualPage = action.payload.actualPage
        },
    }
});

export const {
    actions: {
        setPhotos: setPhotosAction,
        changeTotalResults: changeTotalResultsAction,
        changeActualPage: changeActualPageAction
    }
} = photosSlice;