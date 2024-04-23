import { createContext, FC, PropsWithChildren, useMemo, useReducer } from 'react';
import { ILoginState, ILoginContext, LoginActionType } from 'DMH/utils/types/loginContext.types';

export const LoginContext = createContext<ILoginContext | undefined>(undefined);

const reducer = (state: ILoginState, action: LoginActionType) => {
	switch (action.type) {
		case 'SET_STEP':
			return {
				...state,
				activeStep: action.payload,
			};
		case 'SET_EMAIL':
			return {
				...state,
				email: action.payload,
			};
		case 'SET_ERROR':
			return {
				...state,
				error: action.payload,
			};
	}
};

const initialState: ILoginState = {
	activeStep: 0,
	email: '',
	error: '',
};

export const LoginProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = useMemo(
		() => ({
			state,
			dispatch,
		}),
		[state, dispatch]
	);

	return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
