import {takeLatest, all, call, put} from 'redux-saga/effects';
import {USER_ACTION_TYPES} from "./user-types";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup, userSignOut
} from "../../utils/firebase/firebase.utils";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess} from "./user-action";

const {
    CHECK_USER_SESSION,
    GOOGLE_SIGN_IN_START,
    EMAIL_SIGN_IN_START,
    SIGN_UP_START,
    SIGN_OUT_START,
    SIGN_UP_SUCCESS,
} = USER_ACTION_TYPES;



export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        )
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUpWithEmail({payload: {email,  password, displayName}}) {
    try{
        const {user} = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield put(signUpSuccess(user, {displayName}));
    } catch (error) {
        yield put(signUpFailed(error))
    }
}

export function* signOut() {
    try{
        yield call(userSignOut);
        yield put(signOutSuccess());
    } catch (error) {
        signOutFailed(error);
    }
}



export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
    try {
        yield call(getSnapshotFromUserAuth, user, additionalDetails)
    } catch (error) {
        yield put(signUpFailed(error));
    }
}



export function* onGoogleSignInStart() {
    yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated )
}

export function* onEmailSignIn() {
    yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest(SIGN_UP_START, signUpWithEmail);
}

export function* onSignUpSuccess() {
    yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOut() {
    yield takeLatest(SIGN_OUT_START, signOut);
}



export function* userSaga() {
    yield all([call(onCheckUserSession), call(onSignOut), call(onSignUpSuccess), call(onSignUpStart),call(onGoogleSignInStart), call(onEmailSignIn)]);
}

