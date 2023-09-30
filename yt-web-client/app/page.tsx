import styles from './page.module.css'
import { getVideos } from "./firebase/functions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const videos = await getVideos();

  console.log(videos)

  return (
    <main>
      {
        videos.map((video) => (
          <Link href={`/watch?v=${video.filename}`} key={video.id} >
            <Image src={'/kinaFiller.jpeg'} alt='video' width={120} height={80}
              className={styles.thumbnail}/>
          </Link>
        ))
      }
    </main>
  )
}

export const revalidate = 60;