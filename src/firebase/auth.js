import * as firebase from 'firebase';

import { auth } from './firebase';

var googleProvider = new firebase.auth.GoogleAuthProvider();

// Sign up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign in
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
    auth.signOut();

// Password reset
export const doPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Password change
export const doPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password);

// Sign in with Google Popup
export const doSignInWithPopup = () =>
    auth.signInWithPopup(googleProvider);

// Sign in with Google Redirect
export const doSignInWithRedirect = () =>
    auth.signInWithRedirect(googleProvider);

export const doGetRedirectResult = () =>
    auth.getRedirectResult();

export const doCurrentUserGetToken = () =>
    auth.currentUser.getIdToken(true);