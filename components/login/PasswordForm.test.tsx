import { renderWithLoginContext } from 'DMH/test/testing.helpers';
import PasswordForm from 'DMH/components/login/PasswordForm';
import useLogin from 'DMH/context/login/useLogin';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

jest.mock('DMH/context/login/useLogin');
const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;
const mockDispatch = jest.fn();

const mockPush = jest.fn();
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
	pathname: '/',
	push: mockPush,
}));

describe('PasswordForm', () => {
	describe('when submitting form successfully', () => {
		beforeEach(() => {
			mockUseLogin.mockReturnValue({
				state: {
					activeStep: 1,
					email: 'usertest@gmail.com',
					error: '',
				},
				dispatch: mockDispatch,
			});
		});

		it('should redirect to the home page', async () => {
			renderWithLoginContext(<PasswordForm />);

			const passwordInput = screen.getByPlaceholderText('Contraseña');
			const continueButton = screen.getByText('Continuar');

			await userEvent.type(passwordInput, '123');
			userEvent.click(continueButton);

			await waitFor(() => {
				expect(mockPush).toBeCalledWith('/home');
			});
		});
	});

	describe('when failed a login attempt', () => {
		beforeEach(() => {
			mockUseLogin.mockReturnValue({
				state: {
					activeStep: 1,
					email: 'usertest@gmail.com',
					error: 'Contraseña incorrecta. Vuelva a intentarlo.',
				},
				dispatch: mockDispatch,
			});
		});

		it('should display the error message', () => {
			renderWithLoginContext(<PasswordForm />);

			const errorMessage = screen.getByText('Contraseña incorrecta. Vuelva a intentarlo.');
			expect(errorMessage).toBeInTheDocument();
		});
	});
});
