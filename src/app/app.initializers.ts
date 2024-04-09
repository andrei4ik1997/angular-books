import {MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocompleteDefaultOptions} from '@angular/material/autocomplete';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {MAT_SELECT_CONFIG, MatSelectConfig} from '@angular/material/select';
import {TitleStrategy} from '@angular/router';
import {CustomTitleStrategyService} from '@services';

export const MODULE_PROVIDERS = [
	{
		provide: TitleStrategy,
		useClass: CustomTitleStrategyService,
	},
];

export const TOKENS = [
	{
		provide: MAT_SELECT_CONFIG,
		useValue: {hideSingleSelectionIndicator: true} satisfies MatSelectConfig,
	},
	{
		provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
		useValue: {hideSingleSelectionIndicator: true} satisfies MatAutocompleteDefaultOptions,
	},
	{
		provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
		useValue: {subscriptSizing: 'dynamic'} satisfies MatFormFieldDefaultOptions,
	},
];

export const SERVICES = [];
