import {ResolveFn} from "@angular/router";

export const accessResolver: ResolveFn<boolean> = (route, state) => {
    console.log(route, state);

    return true;
};
