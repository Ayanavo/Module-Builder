const FirebaseConfig = {
    projectId: "my-project-82219-c98e3",
    appId: "1:936361997256:web:149ca30bcbef7254f246fd",
    storageBucket: "my-project-82219-c98e3.appspot.com",
    apiKey: "AIzaSyA2rU3ln-0P6Z_i3qnB5dS021MTgvqrZe0",
    authDomain: "my-project-82219-c98e3.firebaseapp.com",
    messagingSenderId: "936361997256",
    measurementId: "G-1QMB35MTJR",
};

import { NgModule, isDevMode } from "@angular/core";
import { ScreenTrackingService, UserTrackingService, getAnalytics, provideAnalytics } from "@angular/fire/analytics";
import { getApp, initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getDatabase, provideDatabase } from "@angular/fire/database";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { NgxBootstrapIconsModule, allIcons } from "ngx-bootstrap-icons";
import { ToastService } from "src/app/toast-service/toast-container.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { StorageService } from "./Services/storage.service";
import { counterReducer } from "./store/reducers/counter.reducer";
import { ToastServiceComponent } from "./toast-service/toast-service.component";
import { NgTemplateOutlet } from "@angular/common";
import { CommonService } from "./Services/common.service";
import { HttpClientModule } from "@angular/common/http";
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from "@angular/fire/app-check";
import { environment } from "src/environments/environment";

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
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 10 seconds (whichever comes first).
            registrationStrategy: "registerWhenStable:10000",
        }),

        StoreModule.forRoot({ counter: counterReducer }),

        // StoreModule.forRoot(reducers, {
        //     metaReducers,
        // }),
    ],
    bootstrap: [AppComponent],
    providers: [
        CommonService,
        StorageService,
        ToastService,
        provideFirebaseApp(() => initializeApp(FirebaseConfig)),
        provideAuth(() => getAuth()),
        provideAnalytics(() => getAnalytics()),
        ScreenTrackingService,
        UserTrackingService,
        provideFirestore(() => getFirestore()),
        provideDatabase(() => getDatabase()),
        provideAppCheck(() => initializeAppCheck(getApp(), { provider: new ReCaptchaV3Provider(environment.firebase.recaptchaSiteKey), isTokenAutoRefreshEnabled: true })),
    ],
})
export class AppModule {}
