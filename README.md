# YTClone
Upload and watch videos created with Nextjs, Express, and GCP serverless backend.

0. User signs in with Google SSO. Minimal metadata(ID,UID) is stored in firebase to associate owners with their data.
1. User uploads raw video into GCP Cloud Storage bucket holding raw videos.
2. Pub/Sub message is invoked by uploading video, sending message to video processing service
3. Serverless backend Cloud Run hosting processing service trancodes video, then uploads to Cloud Storage bucket for processed videos.
4. Firebase Firestore will store metadata for videos
5. Cloud run hosting our frontend Next.js app will fetch videos from Firestore and return them onto the client for user to view.

### Visit the site here: [Demo link](https://yt-web-client-ertxgnbvwq-uc.a.run.app/)


