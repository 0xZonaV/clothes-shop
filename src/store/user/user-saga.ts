import {takeLatest, all, call, put} from 'typed-redux-saga/macro';
import {USER_ACTION_TYPES} from "./user-types";
import {
    AdditionalInformation,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup, userSignOut
} from "../../utils/firebase/firebase.utils";
import {
    EmailSignInStart,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed, SignUpStart, SignUpSuccess,
    signUpSuccess
} from "./user-action";
import {User} from "firebase/auth";

const {
    CHECK_USER_SESSION,
    GOOGLE_SIGN_IN_START,
    EMAIL_SIGN_IN_START,
    SIGN_UP_START,
    SIGN_OUT_START,
    SIGN_UP_SUCCESS,
} = USER_ACTION_TYPES;



export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );

        if (userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (userAuth) {
            yield* call(getSnapshotFromUserAuth, userAuth);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithEmail({payload: {email, password}}: EmailSignInStart) {
    try {

        const userCredential = yield* call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        )

        if (userCredential) {
            const {user} = userCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signUpWithEmail({payload: {email,  password, displayName}}: SignUpStart) {
    try{
        const userCredential = yield* call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );

        if (userCredential) {
            const {user} = userCredential
            yield* put(signUpSuccess(user, {displayName}));
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

export function* signOut() {
    try{
        yield* call(userSignOut);
        yield* put(signOutSuccess());
    } catch (error) {
        signOutFailed(error as Error);
    }
}



export function* signInAfterSignUp({payload: {user, additionalInformation}}: SignUpSuccess) {
    try {
        yield* call(getSnapshotFromUserAuth, user, additionalInformation)
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}



export function* onGoogleSignInStart() {
    yield* takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
    yield* takeLatest(CHECK_USER_SESSION, isUserAuthenticated )
}

export function* onEmailSignIn() {
    yield* takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield* takeLatest(SIGN_UP_START, signUpWithEmail);
}

export function* onSignUpSuccess() {
    yield* takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOut() {
    yield* takeLatest(SIGN_OUT_START, signOut);
}



export function* userSaga() {
    yield* all([call(onCheckUserSession), call(onSignOut), call(onSignUpSuccess), call(onSignUpStart),call(onGoogleSignInStart), call(onEmailSignIn)]);
}

