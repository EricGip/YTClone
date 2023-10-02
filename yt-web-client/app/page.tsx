import styles from './page.module.css'
import { getVideos } from "./firebase/functions";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

export default async function Home() {

  const videos = await getVideos();

  // console.log(videos)

  return (
    <main>
      {
        videos.map((video) => (
          <div className={styles.item}>
            <Link href={`/watch?v=${video.filename}`} className={styles.thumbnail} key={video.id}>
              <Image src={'/kinaFiller.jpeg'} alt='video' width={350} height={200}
                />
                <span className={styles.thumbnailText}> {video.title}  </span>
                <span className={styles.thumbnailText}> {video.author} </span>
            </Link>
          </div>
        ))
      }
    </main>
  )
}

// nextjs caches the pull results, we use this to refresh results. 
export const revalidate = 60;