import { Dispatch } from 'react';

export interface ILoginState {
	activeStep: number;
	email: string;
	error: string;
}

export interface ISetStep {
	type: 'SET_STEP';
	payload: number;
}

export interface ISetEmail {
	type: 'SET_EMAIL';
	payload: string;
}

export interface ISetError {
	type: 'SET_ERROR';
	payload: string;
}

export type LoginActionType = ISetStep | ISetEmail | ISetError;

export interface ILoginContext {
	state: ILoginState;
	dispatch: Dispatch<LoginActionType>;
}
