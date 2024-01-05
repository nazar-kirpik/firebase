import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQZUPHhC0WXRHaX9Y5I8nGdL2_i5AyyFM",
    authDomain: "fir-9-dojo-6d683.firebaseapp.com",
    projectId: "fir-9-dojo-6d683",
    storageBucket: "fir-9-dojo-6d683.appspot.com",
    messagingSenderId: "540945938540",
    appId: "1:540945938540:web:c27ea8cdf0fb9c810d0049",
    measurementId: "G-JKK8D83VJ4"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    });