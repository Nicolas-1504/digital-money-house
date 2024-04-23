import { renderWithLoginContext } from 'DMH/test/testing.helpers';
import EmailForm from 'DMH/components/login/EmailForm';
import useLogin from 'DMH/context/login/useLogin';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('DMH/context/login/useLogin');
const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;
const mockDispatch = jest.fn();

describe('EmailForm', () => {
	describe('when submitting form', () => {
		beforeEach(() => {
			mockUseLogin.mockReturnValue({
				state: {
					activeStep: 0,
					email: '',
					error: '',
				},
				dispatch: mockDispatch,
			});
		});

		it('should hit the dispatch', async () => {
			renderWithLoginContext(<EmailForm />);

			const emailInput = screen.getByPlaceholderText('Correo electrónico');
			const continueButton = screen.getByText('Continuar');

			await userEvent.type(emailInput, 'usertest@gmail.com');
			userEvent.click(continueButton);

			await waitFor(() => {
				expect(mockDispatch).toBeCalled();
			});

			expect(mockDispatch).toBeCalledWith({
				type: 'SET_STEP',
				payload: 1,
			});

			expect(mockDispatch).toBeCalledWith({
				type: 'SET_EMAIL',
				payload: 'usertest@gmail.com',
			});
		});
	});

	describe('when redirected from a failed login attempt', () => {
		beforeEach(() => {
			mockUseLogin.mockReturnValue({
				state: {
					activeStep: 0,
					email: 'usertest@gmail.com',
					error: 'Usuario inexistente. Vuelva a intentarlo.',
				},
				dispatch: mockDispatch,
			});
		});

		it('should display the error message', () => {
			renderWithLoginContext(<EmailForm />);

			const errorMessage = screen.getByText('Usuario inexistente. Vuelva a intentarlo.');
			expect(errorMessage).toBeInTheDocument();
		});

		it('should hold the email value', () => {
			renderWithLoginContext(<EmailForm />);

			const emailInput = screen.getByPlaceholderText('Correo electrónico');
			expect(emailInput).toHaveValue('usertest@gmail.com');
		});
	});
});
