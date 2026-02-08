// ============================================================
// Firebase + Cloudinary Configuration
// ============================================================
const firebaseConfig = {
    apiKey: "AIzaSyBSfL6M1RUJFhp1FL57cQtCeBfq9j4vxp8",
    authDomain: "yewonpark-b5947.firebaseapp.com",
    projectId: "yewonpark-b5947",
    storageBucket: "yewonpark-b5947.firebasestorage.app",
    messagingSenderId: "829977723745",
    appId: "1:829977723745:web:cbed1296a09f656070fb20"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Cloudinary settings
const CLOUDINARY_CLOUD_NAME = 'dkzjxyoyw';
const CLOUDINARY_UPLOAD_PRESET = 'colorwalk';
