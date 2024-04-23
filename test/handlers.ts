import { rest } from 'msw';
import { loginMock } from 'DMH/test/mocks/login';
import { newCardMock, newCardFailedMock } from 'DMH/test/mocks/newCard';
import { registerFailedMock, registerSuccessMock } from 'DMH/test/mocks/register';
import { IRegisterForm } from 'DMH/utils/types/register.types';

const API_URL = 'https://digitalmoney.ctd.academy';

const handlers = [
	rest.post(`${API_URL}/api/login`, async (req, res, ctx) => {
		return res(ctx.json(loginMock));
	}),

	rest.post(`${API_URL}/api/users`, async (req, res, ctx) => {
		const body: IRegisterForm = await req.json();
		const email = body.email;
		if (email === 'exists@test.com') {
			return res(ctx.json(registerFailedMock));
		} else {
			return res(ctx.json(registerSuccessMock));
		}
	}),

	rest.post(`${API_URL}/api/accounts/5/cards`, async (req, res, ctx) => {
		return res(ctx.json(newCardMock));
	}),
	rest.post(`${API_URL}/api/accounts/6/cards`, async (req, res, ctx) => {
		return res(ctx.json(newCardFailedMock));
	}),
];

export { handlers };
