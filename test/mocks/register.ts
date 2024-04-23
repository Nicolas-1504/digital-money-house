export const registerSuccessMock: { account_id: number; email: string; user_id: number } = {
	account_id: 123456,
	email: 'jest@test.com',
	user_id: 123456,
};

export const registerFailedMock: { error: string } = {
	error: 'Email already registered',
};
