import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
    if (localStorage.getItem("access_token")) {
        // User is logged in, so return true
        return true;
    }
    inject(Router).navigateByUrl("auth/login");
    // User is not logged in, redirect to login page with the return URL and return false
    // inject(Router).navigate(["auth", "login"], { queryParams: { returnUrl: state.url } });
    return false;
};
