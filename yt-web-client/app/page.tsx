import styles from './page.module.css'
import NavBar from './navbar/navbar'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          <NavBar />
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>

      </div>
    </main>
  )
}
