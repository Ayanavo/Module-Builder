import {DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule, NgbPopoverModule, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {NgxBootstrapIconsModule, allIcons} from "ngx-bootstrap-icons";
import {SharedFieldsModule} from "../shared-fields/shared-fields.module";
import {BuildCanvasComponent} from "./Components/build-canvas/build-canvas.component";
import {BuildFieldComponent} from "./Components/build-field/build-field.component";
import {BuildFormRoutingModule} from "./build-form-routing.module";

@NgModule({
    declarations: [BuildCanvasComponent, BuildFieldComponent],
    imports: [CommonModule, NgbToast, NgbPopoverModule, DragDropModule, BuildFormRoutingModule, NgbModule, ReactiveFormsModule, SharedFieldsModule, NgxBootstrapIconsModule.pick(allIcons)],
})
export class BuildFormModule {}
