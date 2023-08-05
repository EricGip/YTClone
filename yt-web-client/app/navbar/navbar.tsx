import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={90} height={90}
                    src="/kinaSpace.png" alt="Home page" />
                <h1 className={styles.navTitle}> project a </h1>
            </Link>
        </nav>
    )
};