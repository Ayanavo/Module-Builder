import {inject} from "@angular/core";
import {Auth, getAuth} from "@angular/fire/auth";
import {CanActivateFn} from "@angular/router";
import {CommonService} from "./Services/common.service";

export const accessGuard: CanActivateFn = (route, state) => {
    let auth = inject(Auth);
    const service = inject(CommonService);
    // console.log(auth.currentUser.isAnonymous);
    // inject(CommonService).getUserConfig().subscribe(console.log);

    return true;
};
