"use client";

import { useSearchParams } from "next/navigation"
import { getVideos } from "../firebase/functions";
import { useEffect, useState } from "react";

export default function Watch() {

    const videoPrefix = "https://storage.googleapis.com/nc-tut-processed-videos/";
    const videoSrc = useSearchParams().get("v");  

    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")

    const getData = async () => {
        const videoData = await getVideos();
        //console.log(videoData)
        //console.log(Object.values(videoData))
        //console.log("video src:" + videoSrc)

        for (const fileObject of videoData) {
            const fileName = fileObject.filename;
            const pulledDescription = fileObject.description
            const pulledTitle = fileObject.title
            
            //console.log(`Filename: ${fileName}`);
            console.log(`Description: ${pulledDescription}`)
            
            // pulledDescription must be a string, so make sure it's not undefined
            if (fileName == videoSrc && pulledDescription && pulledTitle) {
                setTitle(pulledTitle);
                setDescription(pulledDescription);
                console.log(description)
                console.log(title)
            }
        }
    }

    useEffect( () => {
      getData()
    })

    return (
        <div>
            <h1 className="title"> {title} </h1>
            {<video className="video" controls src={videoPrefix + videoSrc}/>} 
            <br/>
            <span className="descript"> {description} </span>
        </div>
        
    )
}

