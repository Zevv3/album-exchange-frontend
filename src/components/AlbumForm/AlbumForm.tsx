import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseTitle, 
        chooseArtist, 
        chooseReleaseDate, 
        chooseGenre,
        chooseLabel, 
        chooseTracks,
        chooseDeezerId,
        chooseCover,
        chooseUser,
        chooseEmail,
        chooseRating,
        chooseReview
    } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface AlbumFormProps {
    id?: string;
    data?: {};
};

interface AlbumState {
    album_title: string;
    artist_name: string;
    release_date: string;
    genre: string;
    number_of_tracks: number;
    label: string;
    deezer_id: string;
    cover_url: string;
};

// This is for adding albums manually
// We will also have a search functionality that will call the Deezer api
export const AlbumForm = (props:AlbumFormProps) => {
    const dispatch = useDispatch();
    let { albumData, getData } = useGetData();
    const store = useStore();
    const { register, handleSubmit } = useForm({  });

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)
        if (props.id!){
            // if it already exists, just update with the new info
            let token = localStorage.getItem('userId')
            console.log(data)
            await serverCalls.update(token, props.id!, data);
            console.log(`Updated: ${data} ${props.id}`);
            window.location.reload();
        } else {
            // if it does not exist, we will make a deezer api call
            // to get the info that we are not asking the user for
            const title = data.album_title
            console.log(title)

            const getAlbumData = async (title:string) => {
                const response = await fetch(`https://api.deezer.com/search/album?q=${title}`);
                const data = await response.json();
                const deezerId = data.data[0].id;
                const newResponse = await fetch(`https://api.deezer.com/album/${deezerId}`)
                const fullData = await newResponse.json()
                return fullData
            };
            
            const showAlbumData = async (title:string) => {
                const data = await getAlbumData(title);
                dispatch(chooseTitle(title))
                dispatch(chooseArtist(data.artist.name))
                dispatch(chooseReleaseDate(data.release_date))
                dispatch(chooseGenre(data.genres.data[0].name))
                dispatch(chooseTracks(data.nb_tracks))
                dispatch(chooseLabel(data.label))
                dispatch(chooseDeezerId(data.id))
                dispatch(chooseCover(data.cover))
                dispatch(chooseUser(localStorage.getItem('userId')))
                dispatch(chooseEmail(localStorage.getItem('user_email')))
                console.log(store.getState());
                await serverCalls.create(store.getState());
                console.log(typeof(data.release_date))
                window.location.reload();
            };
            showAlbumData(title)
            // dispatch(chooseTitle(title));
            // dispatch(chooseArtist(data.artist_name));
            // dispatch(chooseReleaseDate(data.release_date));
            // dispatch(chooseGenre(data.genre));
            // dispatch(chooseTracks(data.number_of_tracks));
            // dispatch(chooseLabel(data.label));
            // dispatch(chooseDeezerId(data.deezer_id));
            // dispatch(chooseCover(data.cover_url));
        };
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="album_title">Album Title</label>
                    <Input {...register('album_title')} name='album_title' placeholder='Album Title' />
                </div>
                {/* <div>
                    <label htmlFor="artist_name">Artist Name (optional)</label>
                    <Input {...register('artist_name')} name='artist_name' placeholder='Artist Name' />
                </div>
                <div>
                    <label htmlFor="release_date">Release Date (optional)</label>
                    <Input {...register('release_date')} name="release_date" placeholder='Release Date' />
                </div>
                <div>
                    <label htmlFor="genre">Genre (optional)</label>
                    <Input {...register('genre')} name='genre' placeholder='Genre' />
                </div> */}
                {/* <div>
                    <label htmlFor="number_of_tracks">Number of Tracks (optional)</label>
                    <Input {...register('number_of_tracks')} name='number_of_tracks' placeholder='Number of Tracks' />
                </div>
                <div>
                    <label htmlFor="label">Label (optional)</label>
                    <Input {...register('label')} name="label" placeholder='Label' />
                </div> */}
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
};

export const UpdateForm = (props:AlbumFormProps) => {
    const dispatch = useDispatch();
    let { albumData, getData } = useGetData();
    const store = useStore();
    const { register, handleSubmit } = useForm({  });

    const onSubmit = async (data:any, event:any) => {
        console.log(data)
        if (props.id!){
            // if it already exists, just update with the new info
            let token = localStorage.getItem('userId')
            
            console.log(props);
            await serverCalls.update(token, props.id!, data);
            console.log(`Updated: ${data} ${props.id}`);
            window.location.reload();
        } else {
            // if it does not exist, we will make a deezer api call
            // to get the info that we are not asking the user for
            // We won't need this part, if it is still here that means I forgot to delete
            // it but I'm keeping it for now for ease of access if I want any of it
            const title = data.album_title
            console.log(title)

            const getAlbumData = async (title:string) => {
                const response = await fetch(`https://api.deezer.com/search/album?q=${title}`);
                const data = await response.json();
                const deezerId = data.data[0].id;
                const newResponse = await fetch(`https://api.deezer.com/album/${deezerId}`)
                const fullData = await newResponse.json()
                console.log(fullData.release_date)
                return fullData
            };
            
            const showAlbumData = async (title:string) => {
                const data = await getAlbumData(title);
                dispatch(chooseTitle(title))
                dispatch(chooseArtist(data.artist.name))
                dispatch(chooseReleaseDate(data.release_date))
                dispatch(chooseGenre(data.genres.data[0].name))
                dispatch(chooseTracks(data.nb_tracks))
                dispatch(chooseLabel(data.label))
                // dispatch(chooseDeezerId(data.id))
                // dispatch(chooseCover(data.cover))
                dispatch(chooseUser(localStorage.getItem('userId')))
                dispatch(chooseEmail(localStorage.getItem('user_email')))
                console.log(store.getState());
                await serverCalls.create(store.getState());
                window.location.reload();
                console.log(data.release_date)
            };
            showAlbumData(title)
            // dispatch(chooseTitle(title));
            // dispatch(chooseArtist(data.artist_name));
            // dispatch(chooseReleaseDate(data.release_date));
            // dispatch(chooseGenre(data.genre));
            // dispatch(chooseTracks(data.number_of_tracks));
            // dispatch(chooseLabel(data.label));
            // dispatch(chooseDeezerId(data.deezer_id));
            // dispatch(chooseCover(data.cover_url));
        };
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="album_title">Album Title</label>
                    <Input {...register('album_title')} name='album_title' placeholder='Album Title' />
                </div>
                <div>
                    <label htmlFor="artist_name">Artist Name</label>
                    <Input {...register('artist_name')} name='artist_name' placeholder='Artist Name' />
                </div>
                <div>
                    <label htmlFor="release_date">Release Date</label>
                    <Input {...register('release_date')} name="release_date" placeholder='Release Date' />
                </div>
                <div>
                    <label htmlFor="genre">Genre</label>
                    <Input {...register('genre')} name='genre' placeholder='Genre' />
                </div>
                <div>
                    <label htmlFor="number_of_tracks">Number of Tracks</label>
                    <Input {...register('number_of_tracks')} name='number_of_tracks' placeholder='Number of Tracks' />
                </div>
                <div>
                    <label htmlFor="label">Label</label>
                    <Input {...register('label')} name="label" placeholder='Label' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
};

export const ReviewForm = (props:AlbumFormProps) => {
    const dispatch = useDispatch();
    let { albumData, getData } = useGetData() ;
    const store = useStore();
    const { register, handleSubmit } = useForm({  });

    const onSubmit = async (data:any, event:any) => {
        console.log(typeof data)
        let token = localStorage.getItem('userId')

        console.log(props.id);
        await serverCalls.review(token, props.id!, data);
        window.location.reload()
    };
    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <label htmlFor='rating'>How Would You Rate This Album?</label>
                    <Input {...register('rating')} name='rating' placeholder='Rating Here, (x/10 usually)' />
                </div>
                <div>
                    <label htmlFor='review'>Thoughts on the album?</label>
                    <Input {...register('review')} name='review' placeholder='Your Review Here' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export const ExchangeReviewForm = (props:AlbumFormProps) => {
    const dispatch = useDispatch();
    let { albumData, getData } = useGetData() ;
    const store = useStore();
    const { register, handleSubmit } = useForm({  });

    const onSubmit = async (data:any, event:any) => {
        console.log(typeof data)
        let token = localStorage.getItem('userId')

        console.log(props.id);
        await serverCalls.reviewExchange(token, props.id!, data);
        window.location.reload()
    };
    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <label htmlFor='exchange-rating'>How Would You Rate This Album?</label>
                    <Input {...register('exchange-rating')} name='exchange-rating' placeholder='Rating Here, (x/10 usually)' />
                </div>
                <div>
                    <label htmlFor='exchange-review'>Thoughts on the album?</label>
                    <Input {...register('exchange-review')} name='exchange-review' placeholder='Your Review Here' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}