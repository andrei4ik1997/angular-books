import {ValidatorFn} from '@angular/forms';

export function existingValueValidator<T>(source: T[], property: string): ValidatorFn {
	return (control) => {
		if (!control.value) {
			return null;
		}

		const value = (control.value as string)?.trim().toLowerCase();

		const hasSameValue =
			source && source.some((o) => (o[property as keyof T] as string)?.trim().toLowerCase() === value);

		return !hasSameValue ? null : {valueExist: true};
	};
}
