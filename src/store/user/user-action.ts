import {Action, ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {USER_ACTION_TYPES} from "./user-types";
import {AdditionalInformation, UserData} from "../../utils/firebase/firebase.utils";
import {User} from "firebase/auth";

const {
    SET_CURRENT_USER,
    CHECK_USER_SESSION,
    EMAIL_SIGN_IN_START,
    GOOGLE_SIGN_IN_START,
    SIGN_IN_FAILED,
    SIGN_IN_SUCCESS,
    SIGN_OUT_FAILED,
    SIGN_OUT_START,
    SIGN_OUT_SUCCESS,
    SIGN_UP_FAILED,
    SIGN_UP_START,
    SIGN_UP_SUCCESS
} = USER_ACTION_TYPES;


export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>;

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, {email: string, password: string, displayName: string}>;

export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES, {user: User, additionalInformation: AdditionalInformation}>;

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>




export const setCurrentUser = withMatcher((user: UserData):SetCurrentUser => createAction(SET_CURRENT_USER, user));

export const checkUserSession = withMatcher(():CheckUserSession => createAction(CHECK_USER_SESSION));

export const emailSignInStart = withMatcher((email: string, password: string):EmailSignInStart => createAction(EMAIL_SIGN_IN_START, {email, password}));

export const googleSignInStart = withMatcher(():GoogleSignInStart => createAction(GOOGLE_SIGN_IN_START));

export const signInSuccess = withMatcher((user: UserData & {id: string}):SignInSuccess => createAction(SIGN_IN_SUCCESS, user));

export const signInFailed = withMatcher((error: Error): SignInFailed => createAction(SIGN_IN_FAILED, error));

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart => createAction(SIGN_UP_START, {email, password, displayName}));

export const signUpSuccess = withMatcher((user: User, additionalInformation: AdditionalInformation):SignUpSuccess => createAction(SIGN_UP_SUCCESS, {user, additionalInformation}));

export const signUpFailed = withMatcher((error: Error): SignUpFailed => createAction(SIGN_UP_FAILED, error));

export const signOutStart = withMatcher((): SignOutStart => createAction(SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher((error: Error):SignOutFailed => createAction(SIGN_OUT_FAILED, error));



