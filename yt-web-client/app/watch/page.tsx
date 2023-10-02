"use client";

import { useSearchParams } from "next/navigation"

export default function Watch() {
    const videoPrefix = "https://storage.googleapis.com/nc-tut-processed-videos/";
    const videoSrc = useSearchParams().get("v");  
    return (
        <div>
            <h1>Watch Page</h1>
            { <video controls src={videoPrefix + videoSrc}/> }
            <h2> title of video holder </h2> 
        </div>
    )
}

