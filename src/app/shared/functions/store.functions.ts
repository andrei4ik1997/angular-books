import {HttpErrorResponse} from '@angular/common/http';
import {Params} from '@angular/router';
import {ActionCreatorProps, NotAllowedCheck, createAction, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';
import {ToastService} from '@services';
import {OperatorFunction, catchError, defer, map, of} from 'rxjs';
import {ApiActions, ApiActionsWithPayload, ErrorPayload} from '../interfaces';

export function getActionDescription(moduleName: string, description: string): string {
	return `[${moduleName}] ${description}`;
}

export const getApiActions = <T1 extends Params>(
	moduleName = '',
	action = '',
	succeedActionProps: ActionCreatorProps<T1> & NotAllowedCheck<T1>,
	failedActionProps = props<ErrorPayload>()
): ApiActions<T1> => ({
	requested: createAction(getActionDescription(moduleName, `${action} requested`)),
	succeeded: createAction(getActionDescription(moduleName, `${action} request was succeeded`), succeedActionProps),
	failed: createAction(getActionDescription(moduleName, `${action} request failed`), failedActionProps),
});

export const getApiActionsWithPayload = <T1 extends Params, T2 extends Params>(
	moduleName = '',
	action = '',
	requestedActionProps: ActionCreatorProps<T2> & NotAllowedCheck<T2>,
	succeedActionProps: ActionCreatorProps<T1> & NotAllowedCheck<T1>,
	failedActionProps = props<ErrorPayload>()
): ApiActionsWithPayload<T1, T2> => ({
	requested: createAction(getActionDescription(moduleName, `${action} requested`), requestedActionProps),
	succeeded: createAction(getActionDescription(moduleName, `${action} request was succeeded`), succeedActionProps),
	failed: createAction(getActionDescription(moduleName, `${action} request failed`), failedActionProps),
});

export function mapActionsFn<ResponsePayload, RequestParams extends Params>(
	action: ApiActions<{payload: ResponsePayload}, RequestParams>
): OperatorFunction<
	ResponsePayload,
	({payload: ResponsePayload} & TypedAction<string>) | (ErrorPayload & TypedAction<string>)
> {
	return (source) =>
		defer(() =>
			source.pipe(
				map((data) => action.succeeded({payload: data})),
				catchError((error: HttpErrorResponse) => {
					ToastService.error({
						message: error.message,
					});

					return of(action.failed(error));
				})
			)
		);
}
