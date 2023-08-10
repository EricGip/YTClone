"use client";

import { Fragment } from "react";

import { signInWithGoogle, signOut } from "../firebase/firebase";
import styles from "./sign-in.module.css"
import { User } from "firebase/auth";

interface SignInProps {
    user: User | null
}

export default function SignIn({ user } : SignInProps) {
    return (
        // using fragment because we dont need to render an element, div would be unneccessary
        
        // since we want interactivity, we need to make this client side. 
        <Fragment>
            { user ?
            (
                // if user exists
                <button className={styles.signin} onClick={signOut}>
                    Sign out
                </button>
            )  : (
                // else if user does not
                <button className={styles.signin} onClick={signInWithGoogle}>
                    Sign in
                </button>   
            ) 
        }
        </Fragment>
    )
}