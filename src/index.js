import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

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
const auth = getAuth();

// collection ref
const colRef = collection(db, 'books');

// queries
const q = query(colRef, orderBy('createdAt'));

// real time collection data
const unsubCol = onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

// adding documents
const addBookform = document.querySelector('.add')
addBookform.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookform.title.value,
        author: addBookform.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBookform.reset()
    })
})

// deleting documents
const deleteBookform = document.querySelector('.delete')
deleteBookform.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookform.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookform.reset()
        });
    
})

// get a single document
const docRef = doc(db, 'books', 'FMe2XDIcrtdz6e1gdU0X')

const unsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: updateForm.new.value
    })
    .then(() => {
        updateForm.reset()
    })

})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })

})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // console.log('the user signed out')
        })
        .catch((err) => {
            console.log(err.message)
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // console.log('user logged in:', cred.user)
        })
        .catch((err) => {
            console.log(err.message);
        });

})

// subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})

// unsubscribing from changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
    console.log('unsubscribing');
    unsubCol();
    unsubDoc();
    unsubAuth();
})