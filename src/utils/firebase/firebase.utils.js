import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDf31qKbin_oUWSNpqJZE_DadB8GZ4TvbA",
    authDomain: "clothing-shop-dc585.firebaseapp.com",
    projectId: "clothing-shop-dc585",
    storageBucket: "clothing-shop-dc585.appspot.com",
    messagingSenderId: "841104951368",
    appId: "1:841104951368:web:6c60c56e33975a68fc307d"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();

    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;

      return acc;
  }, {});

  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInforamtion = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInforamtion
            });
        } catch (error) {
            console.log('Error with creating user ', error.message )
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const userSignOut =async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);