import { DatePipe } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";
import { NgbCalendar, NgbDateParserFormatter, NgbDatepicker } from "@ng-bootstrap/ng-bootstrap";
import * as DateOptions from "./dateoptions.json";
import { DateTimeFormatter } from "./datetimeformater";

@Component({
    selector: "app-datetimerange",
    templateUrl: "./datetimerange.component.html",
    styleUrls: ["./datetimerange.component.scss"],
    providers: [{ provide: NgbDateParserFormatter, useClass: DateTimeFormatter }, DatePipe],
})
export class DatetimeRangeComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    dateformatter = "dd/M/yyyy";
    CustomNavConfig: Array<{ label: string; ngbDate: number }> = DateOptions.default;
    calendar = inject(NgbCalendar);
    controlContainer = inject(ControlContainer);
    datePipe = inject(DatePipe);

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

    get displayDateTimeRange(): string {
        const { day, month, year } = this.FieldControl.value;
        const dateObj = new Date(year, month - 1, day);
        return this.datePipe.transform(dateObj, this.dateformatter);
    }

    navigate(datepicker: NgbDatepicker, number: number) {
        this.FieldControl.setValue(this.calendar.getNext(this.calendar.getToday(), "d", number));
        datepicker.navigateTo(this.FieldControl.value);
    }
}
