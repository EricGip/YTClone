import styles from './page.module.css'
import NavBar from './navbar/navbar'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <NavBar />

      </div>
    </main>
  )
}
