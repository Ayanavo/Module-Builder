import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

export class CustomValidators {
    //Password match pattern
    static PatternMatch(password: string, confirmpassword: string): ValidatorFn {
        return (controlGroup: AbstractControl): ValidationErrors | null => (controlGroup.get(password)?.value === controlGroup.get(confirmpassword)?.value ? null : {patternMatchError: true});
    }

    //at least one checkbox required
    static atLeastOneRequired(controlGroup: AbstractControl): ValidationErrors {
        return Object.values(controlGroup.value).some((val) => val) ? null : {atleastOneRequired: true};
    }

    //Phone format Validator
    static PhoneformatMatch(control: AbstractControl): ValidatorFn {
        return Validators.pattern(/^\+1(\d{10})$/);
    }

    //Range field default and range Validator
    static RangeValidator(control: AbstractControl): ValidationErrors {
        return control.value < +control.parent?.get("default").value ? {outOfRange: true} : null;
    }
}
