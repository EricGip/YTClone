"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import SignIn from "./sign-in";
import Upload from "./upload";

import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";


export default function NavBar() {
    // how do we store state inside a function? Closure

    // init user state
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper( (user) => {
            setUser(user);
        });
        
        // cleaning up subscription on unmount;
        return () => unsubscribe();
    });

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={90} height={90}
                    src="/kinaSpace.png" alt="Home page" /> 
                <h1 className={styles.navTitle}> Project X </h1>
            </Link> 
        
            {
                // removing upload button while public due to no security yet. will be implementing
                // but it might be a "halting problem" and we have to do it manually
                // user && <Upload /> 
                <p className={styles.hiddenText}> Sorry, we are working on securing public upload functionality. We are currently manually whitetlist those who can upload. Thank you. </p>
            }
            <SignIn user={user}/>
        </nav>
    )
};