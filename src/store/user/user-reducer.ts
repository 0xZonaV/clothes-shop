import {AnyAction} from "redux";
import {UserData} from "../../utils/firebase/firebase.utils";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess} from "./user-action";

export type UserState = {
    readonly currentUser: UserData | null,
    readonly error: Error | null,
    readonly isLoading: boolean
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    error: null,
    isLoading: false
};

export const userReducer = (
    state = INITIAL_STATE,
    action: AnyAction) => {

    if (signOutSuccess.match(action)) {
        return {...state, currentUser: null};
    }

    if (signUpSuccess.match(action)) {
        return {...state, currentUser: action.payload, isLoading: false};
    }

    if (signInSuccess.match(action)) {
        return {...state, currentUser: action.payload, isLoading: false};
    }

    if (signOutFailed.match(action) || signUpFailed.match(action) || signInFailed.match(action)) {
        return {...state, error: action.payload, isLoading: false};
    }

    return state;
};