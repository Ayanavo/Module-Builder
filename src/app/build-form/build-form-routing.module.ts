import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuildCanvasComponent } from "./Components/build-canvas/build-canvas.component";

const routes: Routes = [
    {
        path: "",
        component: BuildCanvasComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BuildFormRoutingModule {}
