import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged, NextOrObserver, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import {Category} from "../../store/category/category-types";

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

export type ObjectToAdd = {
    title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>
(collectionKey: string,
 objectsToAdd: T[]) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();

    console.log('done');
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
      (docSnapshot) => docSnapshot.data() as Category
  );
}

export type AdditionalInformation = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInforamtion = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
            console.log('Error with creating user ', error )
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const userSignOut = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}