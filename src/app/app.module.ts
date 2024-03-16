import { NgModule, isDevMode } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { NgxBootstrapIconsModule, allIcons } from "ngx-bootstrap-icons";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ActionComponent } from "./map/action/action.component";
import { DisplayComponent } from "./map/display/display.component";
import { MapComponent } from "./map/map.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { counterReducer } from "./store/reducers/counter.reducer";
import { MainLayoutComponent } from "./main-layout/main-layout.component";

// import { reducers, metaReducers } from "./store/reducers/counter.reducer";

@NgModule({
    declarations: [AppComponent, MapComponent, ActionComponent, DisplayComponent, NavbarComponent, MainLayoutComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxBootstrapIconsModule.pick(allIcons),
        FormsModule,
        NgbModule,
        BrowserAnimationsModule,
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
})
export class AppModule {}
