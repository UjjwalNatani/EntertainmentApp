import { useState, useEffect } from "react";
import Link from "next/link";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import { Navbar } from "../../components/Navbar";

export default function Trending() {
    const [trendingList, setTrendingList] = useState([]);

    const getTrending = () => {
        fetch("https://api.themoviedb.org/3/trending/all/day?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setTrendingList(json.results));
    }

    useEffect(() => {
        getTrending();
    }, [])

    return (
        <div className="main-div">
            <Navbar />
            <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>Trending</h1>
            <div className="movie-section-div">
                {trendingList.map((trending) => (
                    <div className="movie-content-div">
                        <Link href={`/${trending.id}`}><img src={`https://image.tmdb.org/t/p/w500/${trending.poster_path}`} alt="" /></Link>
                        <IconButton onClick={() => {
                            // Local storage handling
                            let bookmarked;
                            const storedData = localStorage.getItem("bookmark");
                            if (!storedData || storedData === "undefined" || storedData == null) {
                                bookmarked = [];
                            } else {
                                bookmarked = JSON.parse(localStorage.getItem("bookmark"));
                            }

                            if (!bookmarked.includes(trending.id)) {
                                const updated = [...bookmarked, trending.id];
                                localStorage.setItem("bookmark", JSON.stringify(updated));
                            } else {
                                window.alert("Trending ID is already bookmarked.");
                            }

                            // localStorage.removeItem('bookmark');
                        }} style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large">
                            <BookmarkIcon />
                        </IconButton>
                        <div className="movie-content-div-text" >
                            <p> {trending.original_title}
                                {trending.original_name}</p>
                            <div style={{ display: 'flex' }}> {trending.release_date}  {trending.first_air_date} <span style={{ marginLeft: '70px' }}></span> {trending.media_type.toUpperCase() == "TV" ? <div><span style={{ marginLeft: '15px' }}></span>TV<span style={{ marginLeft: '15px' }}></span></div> : trending.media_type.toUpperCase()} <span style={{ marginLeft: '70px' }}></span> {trending.original_language.toUpperCase()}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div >
    )
}