import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        album_title: 'Vroom Vroom EP',
        artist_name: 'Charli XCX',
        release_date: '2016-02-26',
        genre: 'alternative',
        number_of_tracks: 4,
        label: 'Vroom Vroom Recordings',
        cover_url: 'https://api.deezer.com/album/12391914/image',
        deezer_id: '12391914',
        rating: '',
        review: '',
        user_email: 'test@email.com',
        user_token: 'GDu5zSE4HmQ4aYU32ALrQeyrnB93'
    },
    reducers: {
        chooseTitle: (state, action) => { state.album_title = action.payload },
        chooseArtist: (state, action) => { state.artist_name = action.payload },
        chooseReleaseDate: (state, action) => { state.release_date = action.payload },
        chooseGenre: (state, action) => { state.genre = action.payload },
        chooseTracks: (state, action) => { state.number_of_tracks = action.payload },
        chooseLabel: (state, action) => { state.label = action.payload },
        chooseCover: (state, action) => { state.cover_url = action.payload },
        chooseDeezerId: (state, action) => { state.deezer_id = action.payload },
        chooseRating: (state, action) => { state.rating = action.payload },
        chooseReview: (state, action) => { state.review = action.payload },
        chooseEmail: (state, action) => {state.user_email = action.payload},
        chooseUser: (state, action) => { state.user_token = action.payload }
    }
});

export const reducer = rootSlice.reducer;
export const { chooseArtist, chooseTitle, chooseReleaseDate, chooseGenre, chooseTracks, chooseLabel, chooseCover, chooseDeezerId, chooseUser, chooseRating, chooseReview, chooseEmail } = rootSlice.actions;