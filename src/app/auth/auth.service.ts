import {HttpClient, HttpHeaders} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {
    Auth,
    AuthProvider,
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    UserCredential,
} from "@angular/fire/auth";
import {defer, from, Observable, switchMap} from "rxjs";
import {environment} from "src/environments/environment";

type LoginConfig = {
    email: string;
    password: string;
};

type RegisterConfig = {
    username: string;
    email: string;
    password: string;
};

@Injectable({
    providedIn: "root",
})
export class AuthService {
    http = inject(HttpClient);
    auth = inject(Auth);

    domain = " https://content-firebaseappcheck.googleapis.com/v1";
    constructor() {
        console.log(`${this.domain}/projects/${environment.firebase.projectId}/${environment.firebase.appId}:exchangeDebugToken?key=${environment.firebase.apiKey}`);
    }
    LogIn(params: LoginConfig): Observable<UserCredential | any> {
        // return this.http.post(`${this.domain}/projects/${environment.firebase.projectId}/${environment.firebase.appId}:exchangeDebugToken?key=${environment.firebase.apiKey}`, {
        //     debug_token: "655f8bb8-837f-4392-b948-0ca2eb1b8e8f",
        // });

        return defer(() => signInWithEmailAndPassword(this.auth, params.email, params.password));
    }

    RegisterUser(params: RegisterConfig): Observable<void | any> {
        return from(createUserWithEmailAndPassword(this.auth, params.email, params.password).then((res) => updateProfile(res.user, {displayName: params.username})));
    }

    setAuthProvider(providertype: string): Observable<UserCredential | any> {
        switch (providertype) {
            case "google":
                return this.AuthLogin(new GoogleAuthProvider());
            case "github":
                return this.AuthLogin(new GithubAuthProvider());
            case "facebook":
                return this.AuthLogin(new FacebookAuthProvider());
            default:
                return from("type error match");
        }
    }

    GuestLogin() {
        return defer(() => signInAnonymously(this.auth));
    }

    AuthLogin(pararms: AuthProvider) {
        return defer(() => signInWithPopup(this.auth, pararms));
    }

    AuthLogout(): Observable<UserCredential | any> {
        return defer(() => signOut(this.auth));
    }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail: string): Observable<any> {
        return defer(() => sendPasswordResetEmail(this.auth, passwordResetEmail));
    }
}
