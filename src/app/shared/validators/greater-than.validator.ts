import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const greaterThanValidator = (
  field1: string,
  field2: string
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const control1 = control.get(field1);
    const control2 = control.get(field2);

    if (!control1?.value || !control2?.value) return null;

    if (Number(control1?.value) >= Number(control2?.value))
      return { greaterThan: true };

    return null;
  };
};
