import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export enum CompareNumberEnum {
  equal,
  greaterThan,
  lessThan,
  greaterThanEqual,
  lessThanEqual,
}

export const compareNumberValidator = (
  field1: string,
  field2: string,
  compareNumberEnum: CompareNumberEnum
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value1 = control.get(field1)!.value;
    const value2 = control.get(field2)!.value;

    if (!value1 || !value2) return null;

    switch (compareNumberEnum) {
      case CompareNumberEnum.equal:
        if (Number(value1) == Number(value2)) return null;
        break;
      case CompareNumberEnum.greaterThan:
        if (Number(value1) > Number(value2)) return null;
        break;
      case CompareNumberEnum.lessThan:
        if (Number(value1) < Number(value2)) return null;
        break;
      case CompareNumberEnum.greaterThanEqual:
        if (Number(value1) >= Number(value2)) return null;
        break;
      case CompareNumberEnum.lessThanEqual:
        if (Number(value1) <= Number(value2)) return null;
        break;
    }
    return { compareNumber: true };
  };
};
