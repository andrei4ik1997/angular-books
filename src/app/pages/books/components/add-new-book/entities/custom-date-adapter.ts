import {NativeDateAdapter} from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
	public override getFirstDayOfWeek(): number {
		return 1;
	}
}
