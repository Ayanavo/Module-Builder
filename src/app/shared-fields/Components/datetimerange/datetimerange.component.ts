import { Component, Inject, Input, OnInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";
import { NgbCalendar, NgbDateParserFormatter, NgbDatepicker } from "@ng-bootstrap/ng-bootstrap";
import { DateTimeFormatter } from "./datetimeformater";

@Component({
    selector: "app-datetimerange",
    templateUrl: "./datetimerange.component.html",
    styleUrls: ["./datetimerange.component.scss"],
    providers: [{ provide: NgbDateParserFormatter, useClass: DateTimeFormatter }],
})
export class DatetimeRangeComponent implements OnInit {
    @Input() ControlAccess: Object;
    FormGroup: FormGroup;
    dateformatter = "dd/mm/yyyy";

    CustomNavConfig: Array<{ label: string; ngbDate: number }> = [
        { label: "Today", ngbDate: 0 },
        { label: "Yesterday", ngbDate: -1 },
        { label: "Tomorrow", ngbDate: 1 },
        { label: "Next Week", ngbDate: 7 },
        { label: "2 Weeks", ngbDate: 14 },
        { label: "4 Weeks", ngbDate: 28 },
        { label: "8 Weeks", ngbDate: 56 },
        { label: "Previous Week", ngbDate: -7 },
    ];

    constructor(@Inject(NgbCalendar) private calendar, public controlContainer: ControlContainer) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
        this.ControlAccess["default"] == "current_date" && this.SetCurrentDate;
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormGroup;
    }

    get SetCurrentDate() {
        return this.FieldControl.setValue(this.calendar.getToday());
    }

    navigate(datepicker: NgbDatepicker, number: number) {
        // datepicker.state.focusedDate
        this.FieldControl.setValue(this.calendar.getNext(this.calendar.getToday(), "d", number));
        datepicker.navigateTo(this.FieldControl.value);
    }
}
