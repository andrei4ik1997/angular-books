import iziToast, {IziToastSettings} from 'izitoast';

export const DEFAULT_SETTINGS: IziToastSettings = {
	close: false,
	messageSize: '16',
	progressBar: false,
	transitionIn: 'bounceInUp',
};

export class ToastService {
	public static applySettings(): void {
		iziToast.settings(DEFAULT_SETTINGS);
	}

	public static success(options: IziToastSettings): void {
		const mergedOptions = Object.assign({timeout: 3000}, options);
		iziToast.success(mergedOptions);
	}

	public static info(options: IziToastSettings): void {
		const mergedOptions = Object.assign({timeout: 3000}, options);
		iziToast.info(mergedOptions);
	}

	public static warning(options: IziToastSettings): void {
		iziToast.warning(options);
	}

	public static error(settings: IziToastSettings): void {
		const mergedOptions = Object.assign({timeout: 30000, close: true}, settings);
		iziToast.error(mergedOptions);
	}
}

// Apply default settings
ToastService.applySettings();
