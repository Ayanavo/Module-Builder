import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, defer, Observable, of, switchMap, take} from "rxjs";
import {environment} from "src/environments/environment";

@Injectable()
export class authInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.getAppChecktoken().pipe(
            take(1),
            switchMap((token: string) => {
                if (token) {
                    req = req.clone({
                        setHeaders: {"Content-Type": "application/json", "X-Firebase-AppCheck": token},
                    });

                    return next.handle(req);
                }
                return of(null);
            }),
            catchError((error: HttpErrorResponse) => {
                console.error("Error in authInterceptor:", error);
                return of(null);
            })
        );
    }

    getAppChecktoken(): Observable<unknown> {
        if ((window as any).grecaptcha) {
            return defer(() => (window as any).grecaptcha.execute(environment.firebase.recaptchaSiteKey, {action: "submit"}));
        }
        return of();
    }
}
