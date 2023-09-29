import { credential } from "firebase-admin";
import {initializeApp} from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";

initializeApp({credential: credential.applicationDefault()});

const firestore = new Firestore();

const videoCollectionId = "videos";

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: "processing" | "processed",
    title?: string,
    description?: string
}

async function getVideo(videoId: string) {
    // we have await here becasue we dont want to return data until we receive the data
    // also, snapshot.data() is a promise function, and we require the await
    const snapshot = await firestore.collection(videoCollectionId).doc(videoId).get();
    return (snapshot.data() as Video) ?? {};
}

export function setVideo(videoId: string, video: Video) {
    // we don't need await here 
    return firestore
        .collection(videoCollectionId)
        .doc(videoId)
        .set(video, { merge: true })
}

export async function isVideoNew(videoId: string) {
    const video = await getVideo(videoId);
    return video?.status === undefined;
}