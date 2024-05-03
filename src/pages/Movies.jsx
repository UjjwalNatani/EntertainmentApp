import { useState, useEffect } from "react";
import Link from "next/link";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import { Navbar } from "./api/Navbar";
import Image from "next/image";

export default function Movies() {
    const [movieList, setMovieList] = useState([]);

    const getMovie = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setMovieList(json.results));
    }

    useEffect(() => {
        getMovie();
    }, [])

    return (
        <div className="main-div">
            <Navbar />
            <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>Movies</h1>
            <div className="movie-section-div">
                {movieList.map((movie, index) => (
                    <div key={index} className="movie-content-div">
                        <Link href={`/${movie.id}`}><Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" /></Link>
                        <IconButton style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large" onClick={() => {
                            // Local storage handling
                            let bookmarked;
                            const storedData = localStorage.getItem("bookmark");
                            if (!storedData || storedData === "undefined" || storedData == null) {
                                bookmarked = [];
                            } else {
                                bookmarked = JSON.parse(localStorage.getItem("bookmark"));
                            }

                            if (!bookmarked.includes(movie.id)) {
                                const updated = [...bookmarked, movie.id];
                                localStorage.setItem("bookmark", JSON.stringify(updated));
                            } else {
                                window.alert("Movie ID is already bookmarked.");
                            }

                            // localStorage.removeItem('bookmark');
                        }}>
                            <BookmarkIcon />
                        </IconButton>
                        <div className="content-div-text">
                            <p>{movie.original_title} </p>
                            {movie.release_date}<span style={{ marginLeft: '70px' }}></span> MOVIE<span style={{ marginLeft: '70px' }}></span> {movie.original_language.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}