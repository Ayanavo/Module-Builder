import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbRatingModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ColorTheme, NgxBootstrapIconsModule, allIcons } from "ngx-bootstrap-icons";
import { QuillModule } from "ngx-quill";
import { BooleanComponent } from "../shared-fields/Components/boolean/boolean.component";
import { CheckboxComponent } from "../shared-fields/Components/checkbox/checkbox.component";
import { DatetimeRangeComponent } from "../shared-fields/Components/datetimerange/datetimerange.component";
import { EditorComponent } from "../shared-fields/Components/editor/editor.component";
import { EmailComponent } from "../shared-fields/Components/email/email.component";
import { ErrorMsgComponent } from "../shared-fields/Components/error-msg/error-msg.component";
import { FormulaComponent } from "../shared-fields/Components/formula/formula.component";
import { ListComponent } from "../shared-fields/Components/list/list.component";
import { NumberComponent } from "../shared-fields/Components/number/number.component";
import { PasswordComponent } from "../shared-fields/Components/password/password.component";
import { PhoneComponent } from "../shared-fields/Components/phone/phone.component";
import { RadioComponent } from "../shared-fields/Components/radio/radio.component";
import { RatingComponent } from "../shared-fields/Components/rating/rating.component";
import { TextComponent } from "../shared-fields/Components/text/text.component";
import { TextareaComponent } from "../shared-fields/Components/textarea/textarea.component";
import { VercelComponent } from "../shared-fields/Components/vercel/vercel.component";
import { NumberonlyDirective } from "./Components/number/numberonly.directive";
import { PhoneFormaterDirective } from "./Components/phone/phone-formater.directive";
import { FieldConfig } from "./WidthConfig";
import { ButtonComponent } from "./Components/button/button.component";
import { LabelComponent } from "./Components/label/label.component";
import { LinkComponent } from "./Components/link/link.component";

@NgModule({
    declarations: [
        TextComponent,
        ListComponent,
        TextareaComponent,
        BooleanComponent,
        PhoneComponent,
        PhoneFormaterDirective,
        DatetimeRangeComponent,
        CheckboxComponent,
        RadioComponent,
        NumberComponent,
        NumberonlyDirective,
        EditorComponent,
        EmailComponent,
        VercelComponent,
        PasswordComponent,
        ErrorMsgComponent,
        FormulaComponent,
        RatingComponent,
        ButtonComponent,
        LabelComponent,
        LinkComponent,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDatepickerModule, NgbRatingModule, NgbTooltipModule, QuillModule.forRoot(), NgxBootstrapIconsModule.pick(allIcons, { theme: ColorTheme.Warning })],
    exports: [
        TextComponent,
        ListComponent,
        TextareaComponent,
        BooleanComponent,
        PhoneComponent,
        PhoneFormaterDirective,
        DatetimeRangeComponent,
        CheckboxComponent,
        RadioComponent,
        NumberComponent,
        NumberonlyDirective,
        EditorComponent,
        EmailComponent,
        VercelComponent,
        PasswordComponent,
        FormulaComponent,
        RatingComponent,
        ButtonComponent,
        LabelComponent,
        LinkComponent,
    ],
    providers: [FieldConfig],
})
export class SharedFieldsModule {}
