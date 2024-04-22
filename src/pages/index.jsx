import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import IconButton from '@mui/material/IconButton';
import { Navbar } from "../../components/Navbar";
import Link from "next/link";

export default function Home() {
    const [movieList, setMovieList] = useState([]);
    const [trendingList, setTrendingList] = useState([]);
    const [tvList, setTvList] = useState([]);
    
    const getMovie = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setMovieList(json.results));
    }
    const getTrending = () => {
        fetch("https://api.themoviedb.org/3/trending/all/day?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setTrendingList(json.results));
    }
    const getTv = () => {
        fetch("https://api.themoviedb.org/3/discover/tv?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setTvList(json.results));
    }

    useEffect(() => {
        getMovie();
        getTv();
        getTrending();
    }, [])

    return (
        <div>
            <Navbar/>
            <h1 style={{marginTop:'70px'}}>Trending</h1>
            <div className="section-div">
                {trendingList.map((trending) => (
                    <div className="content-div"> 
                         <Link href={`/${trending.id}`}><img src={`https://image.tmdb.org/t/p/w500/${trending.poster_path}`} alt="" /></Link>
                        {/* <IconButton style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large">
                            <BookmarkIcon />
                        </IconButton> */}
                        <div className="content-div-text">
                           <p> {trending.original_title}
                            {trending.original_name}</p> 
                            {trending.release_date}  {trending.first_air_date} <span style={{ marginLeft: '60px' }}></span> {trending.media_type.toUpperCase()} <span style={{ marginLeft: '60px' }}></span> {trending.original_language.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>

            <h1>Movies</h1>
            <div className="section-div">
                {movieList.map((movie) => (
                    <div className="content-div">
                        <Link href={`/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" /></Link>
                        {/* <IconButton style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large">
                            <BookmarkIcon />
                        </IconButton> */}
                        <div className="content-div-text">
                            <p>{movie.original_title} </p>
                            {movie.release_date}<span style={{ marginLeft: '60px' }}></span> MOVIE<span style={{ marginLeft: '60px' }}></span> {movie.original_language.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>

            <h1>TV</h1>
            <div className="section-div">
                {tvList.map((tv) => (
                    <div className="content-div">
                        <Link href={`/${tv.id}`}><img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt="" /></Link>
                        {/* <IconButton style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large">
                            <BookmarkIcon />
                        </IconButton> */}
                        <div className="content-div-text">
                        <p>{tv.original_name} </p>
                            {tv.first_air_date}<span style={{ marginLeft: '80px' }}></span> TV<span style={{ marginLeft: '80px' }}></span> {tv.original_language.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}