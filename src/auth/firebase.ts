import { saveCookie } from '@/utils/storage/cookie';
import { getApps, getApp, initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    FacebookAuthProvider,
    sendPasswordResetEmail,
    fetchSignInMethodsForEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updatePassword
} from 'firebase/auth';
import config from 'config';
import { ACCESS_TOKEN_KEY } from 'src/utils/storage/constant';

if (getApps().length < 1) {
    initializeApp(config.firebase);
}

export function fbGetToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const fbUser = await getAuth()?.currentUser;
            if (!fbUser) {
                const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
                    if (user) {
                        try {
                            const idToken = await user?.getIdToken(/* forceRefresh */ true);
                            // console.log("here", idToken);
                            if (idToken) {
                                // TODO uncomment bottom line (for silent refresh)
                                saveCookie(ACCESS_TOKEN_KEY, idToken);
                                resolve(idToken);
                            }
                            unsubscribe();
                        } catch (err) {
                            reject(err);
                        }

                        // ...
                    } else {
                        reject('on token no user');
                    }
                });
            } else {
                const idToken = await fbUser?.getIdToken(/* forceRefresh */ true);

                if (idToken) {
                    // TODO uncomment bottom line (for silent refresh)
                    saveCookie(ACCESS_TOKEN_KEY, idToken);
                    resolve(idToken);
                }
            }
        } catch (err) {
            reject(err);
        }
        // else reject(ACCESS_TOKEN_FAILED);
    });
}

export async function fbCreateAccountBehalf(email: string, password: string) {
    let secondaryApp;
    try {
        secondaryApp = initializeApp(config.firebase, 'Secondary');
    } catch (e) {
        secondaryApp = getApp('Secondary');
    }
    try {
        const res = await secondaryApp.auth().createUserWithEmailAndPassword(email, password);

        return res.user?.email;
    } catch (err) {}
}

export async function fbSignUp(email: string, password: string) {
    const res = await createUserWithEmailAndPassword(getAuth(), email, password);

    return res.user?.email;
}

export async function fbSignOut() {
    const res = await getAuth().signOut();
    return res;
}

export async function fbSignUpToken(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fbSignUp(email, password);
            const idToken = await fbGetToken();
            resolve(idToken);
        } catch (err) {
            console.error(err, 'err3');
            reject(err);
        }
    });
}

export async function fbSignInGoogleToken() {
    try {
        const provider = new GoogleAuthProvider();

        signInWithRedirect(getAuth(), provider);
    } catch (err) {
        throw new Error(err);
    }
}

export async function fbSignInFacebookToken() {
    try {
        const provider = new FacebookAuthProvider();

        signInWithRedirect(getAuth(), provider);
    } catch (err) {
        throw new Error(err);
    }
}

export async function fbSignIn(email: string) {
    return new Promise<Array<string>>(async (resolve, reject) => {
        const res = await fetchSignInMethodsForEmail(getAuth(), email);

        // const linkRes = await firebase
        //   .auth()
        //   ?.currentUser?.linkWithCredential(
        //     firebase.auth.EmailAuthProvider.credential("pooria@apsy.io", "password")
        //   );
        // console.log(linkRes);

        resolve(res);
    });
}

export async function fbRemoveUser() {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const user = getAuth().currentUser;
            if (!user) {
                reject('FAILED');
                return;
            }
            await user.delete();
            resolve('SUCCESS');
        } catch (err) {
            reject(err);
        }
    });
}

export async function fbSignInToken(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await signInWithEmailAndPassword(getAuth(), email, password);
            const idToken = await fbGetToken();
            resolve(idToken);
        } catch (err) {
            reject(err);
        }
    });
}

export async function fbPasswordReset(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
}

export async function fbGetUser() {
    return getAuth().currentUser;
}

export async function updatePassworduser(email: string, oldPassword: string, newPassword: string) {
    await fbSignInToken(email, oldPassword);
    const fbUser = await getAuth();

    return updatePassword(fbUser.currentUser, newPassword);
}
