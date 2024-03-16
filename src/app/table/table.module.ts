import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxBootstrapIconsModule, allIcons } from "ngx-bootstrap-icons";
import { TableRoutingModule } from "./table-routing.module";
import { TestApiService } from "./test-api.service";
import { TestApiComponent } from "./test-api/test-api.component";

@NgModule({
    declarations: [TestApiComponent],
    imports: [CommonModule, NgxBootstrapIconsModule.pick(allIcons), HttpClientModule, ReactiveFormsModule, TableRoutingModule],
    providers: [TestApiService],
})
export class TableModule {}
