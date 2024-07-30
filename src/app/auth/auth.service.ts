import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
    Auth,
    AuthProvider,
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    UserCredential,
} from "@angular/fire/auth";
import { defer, from, Observable } from "rxjs";

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

    LogIn(params: LoginConfig): Observable<UserCredential | any> {
        return defer(() => signInWithEmailAndPassword(this.auth, params.email, params.password));
    }

    RegisterUser(params: RegisterConfig): Observable<void | any> {
        return from(createUserWithEmailAndPassword(this.auth, params.email, params.password).then((res) => updateProfile(res.user, { displayName: params.username })));
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
}
