import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Navbar } from "./api/Navbar";
import Image from "next/image";

export default function Details() {
    const [movieList, setMovieList] = useState([]);
    const [trendingList, setTrendingList] = useState([]);
    const [tvList, setTvList] = useState([]);
    const router = useRouter();

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

    const selectedTrendingItem = trendingList.find(item => item.id === parseInt(router.query.id));
    const selectedMovieItem = movieList.find(item => item.id === parseInt(router.query.id));
    const selectedTvItem = tvList.find(item => item.id === parseInt(router.query.id));

    const selectedItem = selectedTrendingItem || selectedMovieItem || selectedTvItem;

    return (
        <div className="main-div">
            <Navbar />

            {selectedItem && (
                <div className="id-sub-div">
                    <div className="sub-left">

                        <Image style={{ borderRadius: '60px' }} src={`https://image.tmdb.org/t/p/w500/${selectedItem.poster_path}`} alt="" height='500px' />
                    </div>
                    <div className="sub-right">

                        <h2>{selectedItem.original_title || selectedItem.original_name}</h2><br />
                        <h6>{selectedItem.overview} <br /> <br />
                            Language : {selectedItem.original_language.toUpperCase()} <br /><br />
                            Popularity : {selectedItem.popularity} <br /><br />
                            Release-Date : {selectedItem.release_date || selectedItem.first_air_date} <br /></h6>
                    </div>
                </div>
            )}
        </div>
    )
}