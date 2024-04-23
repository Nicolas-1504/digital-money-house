import { ILoginState, LoginActionType } from 'DMH/utils/types/loginContext.types';
import { loginUser } from 'DMH/services/users.service';
import { ILoginForm } from 'DMH/utils/types/login.types';
import { NextRouter } from 'next/router';
import { Dispatch } from 'react';

export const doLogin = async (
	data: ILoginForm,
	router: NextRouter,
	dispatch: Dispatch<LoginActionType>,
	state: ILoginState,
	authenticate: (token: string) => void
) => {
	dispatch({
		type: 'SET_ERROR',
		payload: '',
	});

	await loginUser(data).then((data) => {
		if (data.token) {
			authenticate(data.token);
			router.push('/home');
		} else {
			if (data.error === 'user not found') {
				dispatch({
					type: 'SET_STEP',
					payload: state.activeStep - 1,
				});
				dispatch({
					type: 'SET_ERROR',
					payload: 'Usuario inexistente. Vuelva a intentarlo.',
				});
			} else if (data.error === 'invalid credentials') {
				dispatch({
					type: 'SET_ERROR',
					payload: 'Contraseña incorrecta. Vuelva a intentarlo.',
				});
			} else {
				dispatch({
					type: 'SET_STEP',
					payload: state.activeStep - 1,
				});
				dispatch({
					type: 'SET_ERROR',
					payload: 'Ha ocurrido un error. Vuelva a intentarlo.',
				});
			}
		}
	});
};
