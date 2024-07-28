import { Component, Inject, Input, OnInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";
import { NgbCalendar, NgbDateParserFormatter, NgbDatepicker } from "@ng-bootstrap/ng-bootstrap";
import { DateTimeFormatter } from "./datetimeformater";
import * as DateOptions from "./dateoptions.json";

@Component({
    selector: "app-datetimerange",
    templateUrl: "./datetimerange.component.html",
    styleUrls: ["./datetimerange.component.scss"],
    providers: [{ provide: NgbDateParserFormatter, useClass: DateTimeFormatter }],
})
export class DatetimeRangeComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    dateformatter = "dd/mm/yyyy";
    CustomNavConfig: Array<{ label: string; ngbDate: number }> = DateOptions.default;

    constructor(@Inject(NgbCalendar) private calendar, public controlContainer: ControlContainer) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormGroup;
    }

    get SetCurrentDate() {
        return this.FieldControl.setValue(this.calendar.getToday());
    }

    toggleDateTimeState($event: MouseEvent) {
        console.log($event);
    }

    navigate(datepicker: NgbDatepicker, number: number) {
        this.FieldControl.setValue(this.calendar.getNext(this.calendar.getToday(), "d", number));
        datepicker.navigateTo(this.FieldControl.value);
    }
}
