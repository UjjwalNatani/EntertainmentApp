import { useEffect, useState } from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import { Navbar } from "./api/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function TV() {
    const [tvList, setTvList] = useState([]);

    const getTv = () => {
        fetch("https://api.themoviedb.org/3/discover/tv?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setTvList(json.results));
    }

    useEffect(() => {
        getTv();
    }, [])

    return (
        <div className="main-div">
            <Navbar />
            <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>TV</h1>
            <div className="movie-section-div">
                {tvList.map((tv, index) => (
                    <div key={index} className="movie-content-div">
                        <Link href={`/${tv.id}`}><Image src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt="" height={400} width={400} /></Link>
                        <IconButton style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large" onClick={() => {
                            // Local storage handling
                            let bookmarked;
                            const storedData = localStorage.getItem("bookmark");
                            if (!storedData || storedData === "undefined" || storedData == null) {
                                bookmarked = [];
                            } else {
                                bookmarked = JSON.parse(localStorage.getItem("bookmark"));
                            }

                            if (!bookmarked.includes(tv.id)) {
                                const updated = [...bookmarked, tv.id];
                                localStorage.setItem("bookmark", JSON.stringify(updated));
                            } else {
                                window.alert("TV ID is already bookmarked.");
                            }

                            // localStorage.removeItem('bookmark');
                        }}>
                            <BookmarkIcon />
                        </IconButton>
                        <div className="content-div-text">
                            <p>{tv.original_name} </p>
                            {tv.first_air_date}<span style={{ marginLeft: '85px' }}></span> TV<span style={{ marginLeft: '85px' }}></span> {tv.original_language.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}