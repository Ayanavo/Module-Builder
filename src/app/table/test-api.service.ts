import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TestApiService {
    constructor(private http: HttpClient) {}

    getUserList(): Observable<any[]> {
        return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users`, { observe: "response" }).pipe(
            map((response: HttpResponse<any[]>) => {
                if (response.status == 200) {
                    return response.body.map(
                        (interate) => ({ ...interate, username: interate.username.toLowerCase().replace(".", "_"), website: { link: `https://${interate.website}`, refname: interate.website.split(".")[0] } })
                        // { username: interate.username }
                    );
                }
                return null;
            }),
            catchError((err) => {
                return of(err.message || "No record available!");
            })
        );
    }
}
