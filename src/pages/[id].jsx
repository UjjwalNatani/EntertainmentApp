import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Details() {

    // const [mergedList, setMergedList] = useState([]);
    // const router = useRouter();

    // // Fetch trending data from API
    // const getTrending = () => {
    //     fetch("https://api.themoviedb.org/3/trending/all/day?api_key=2940b231da9ae329bd26aca2aefa5f2f")
    //         .then(res => res.json())
    //         .then(json => {
    //             setMergedList(prevList => prevList.concat(json.results));
    //         });
    // }

    // // Fetch movie data from API
    // const getMovies = () => {
    //     fetch("https://api.themoviedb.org/3/discover/movie?api_key=2940b231da9ae329bd26aca2aefa5f2f")
    //         .then(res => res.json())
    //         .then(json => {
    //             setMergedList(prevList => prevList.concat(json.results));
    //         });
    // }

    // // Fetch TV data from API
    // const getTV = () => {
    //     fetch("https://api.themoviedb.org/3/discover/tv?api_key=2940b231da9ae329bd26aca2aefa5f2f")
    //         .then(res => res.json())
    //         .then(json => {
    //             setMergedList(prevList => prevList.concat(json.results));
    //         });
    // }

    // useEffect(() => {
    //     getTrending();
    //     getMovies();
    //     getTV();
    // }, []);

    // // Find the selected item from the merged list based on router ID
    // const selectedItem = mergedList.find(item => item.id === parseInt(router.query.id));
    // console.log(selectedItem);
    // return (
    //     <div>
    //         {/* Render details of the selected item */}
    //         {selectedItem && (
    //             <div>
    //                 <h2>{selectedItem.original_title || selectedItem.original_name}</h2>
    //                 {selectedItem.overview} <br />
    //                 {selectedItem.media_type} <br />
    //                 {selectedItem.original_language} <br />
    //                 {selectedItem.popularity} <br />
    //                 {selectedItem.release_date} <br />
    //                 <img src={`https://image.tmdb.org/t/p/w500/${selectedItem.poster_path}`} alt="" />
    //                 <img src={`https://image.tmdb.org/t/p/w500/${selectedItem.backdrop_path}`} alt="" />
    //                 {/* Render other details of the selected item */}
    //             </div>
    //         )}
    //     </div>
    // );







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


    const router = useRouter();

    const selectedTrendingItem = trendingList.find(item => item.id === parseInt(router.query.id));
    const selectedMovieItem = movieList.find(item => item.id === parseInt(router.query.id));
    const selectedTvItem = tvList.find(item => item.id === parseInt(router.query.id));

    const selectedItem = selectedTrendingItem || selectedMovieItem || selectedTvItem;

    return (
        <div>
            Details

            {selectedItem && (
                <div>
                    <h2>{selectedItem.original_title || selectedItem.original_name}</h2>
                    {selectedItem.overview} <br />
                    {selectedItem.original_language} <br />
                    {selectedItem.popularity} <br />
                    {selectedItem.release_date} <br />
                    <img src={`https://image.tmdb.org/t/p/w500/${selectedItem.poster_path}`} alt="" />
                    <img src={`https://image.tmdb.org/t/p/w500/${selectedItem.backdrop_path}`} alt="" />
                    {/* Render other details of the selected item */}
                </div>
            )}
        </div>
    )
}