import {NgTemplateOutlet} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule, isDevMode} from "@angular/core";
import {ScreenTrackingService, UserTrackingService, getAnalytics, provideAnalytics} from "@angular/fire/analytics";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {getDatabase, provideDatabase} from "@angular/fire/database";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceWorkerModule} from "@angular/service-worker";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {StoreModule} from "@ngrx/store";
import {NgxBootstrapIconsModule, allIcons} from "ngx-bootstrap-icons";
import {ToastService} from "src/app/toast-service/toast-container.service";
import {environment} from "src/environments/environment";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {authInterceptor} from "./auth.interceptor";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {CommonService} from "./Services/common.service";
import {StorageService} from "./Services/storage.service";
import {counterReducer} from "./store/reducers/counter.reducer";
import {ToastServiceComponent} from "./toast-service/toast-service.component";

// import { reducers, metaReducers } from "./store/reducers/counter.reducer";

@NgModule({
    declarations: [AppComponent, NavbarComponent, MainLayoutComponent, ToastServiceComponent],
    imports: [
        BrowserModule,
        NgTemplateOutlet,
        AppRoutingModule,
        NgxBootstrapIconsModule.pick(allIcons),
        FormsModule,
        NgbModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AngularFirestoreModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 10 seconds (whichever comes first).
            registrationStrategy: "registerWhenStable:10000",
        }),

        StoreModule.forRoot({counter: counterReducer}),

        // StoreModule.forRoot(reducers, {
        //     metaReducers,
        // }),
    ],
    bootstrap: [AppComponent],
    providers: [
        CommonService,
        StorageService,
        ToastService,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideAnalytics(() => getAnalytics()),
        ScreenTrackingService,
        UserTrackingService,
        provideFirestore(() => getFirestore()),
        provideDatabase(() => getDatabase()),
        // provideAppCheck(() => initializeAppCheck(undefined, { provider: new ReCaptchaV3Provider(environment.firebase.recaptchaSiteKey), isTokenAutoRefreshEnabled: true })),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: authInterceptor,
            multi: true,
        },
    ],
})
export class AppModule {}
