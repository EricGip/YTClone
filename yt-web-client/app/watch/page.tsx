"use client";

import styles from "./page.module.css"
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

        for (const fileObject of videoData) {
            const fileName = fileObject.filename;
            const pulledDescription = fileObject.description
            const pulledTitle = fileObject.title
    
            // pulledDescription must be a string, so make sure it's not undefined
            if (fileName == videoSrc && pulledDescription && pulledTitle) {
                setTitle(pulledTitle);
                setDescription(pulledDescription);
            }
        }
    }

    useEffect( () => {
      getData()
    })

    return (
        <div className={styles.div}>
            <h1 className={styles.title}> {title} </h1>
            {<video className={styles.video} controls src={videoPrefix + videoSrc}/>} 
            <br/>
            <pre className={styles.description}> {description} </pre>
        </div>
        
    )
}

