import { renderWithLoginContext } from 'DMH/test/testing.helpers';
import LoginStepperForm from 'DMH/components/login/LoginStepperForm';
import { screen } from '@testing-library/react';
import useLogin from 'DMH/context/login/useLogin';

jest.mock('DMH/context/login/useLogin');
const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;
const mockDispatch = jest.fn();

describe('LoginStepperForm', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('when rendering the initial page', () => {
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

		it('should render the email title', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const emailTitle = screen.getByText('¡Hola! Ingresá tu e-mail');
			expect(emailTitle).toBeInTheDocument();
		});

		it('should render the email input', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const emailInput = screen.getByPlaceholderText('Correo electrónico');
			expect(emailInput).toBeInTheDocument();
		});

		it('should render the continue and create account buttons', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const continueButton = screen.getByText('Continuar');
			expect(continueButton).toBeInTheDocument();
			const createAccountButton = screen.getByText('Crear cuenta');
			expect(createAccountButton).toBeInTheDocument();
		});

		it('should not render the password title', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const passwordTitle = screen.queryByText('Ingresá tu contraseña');
			expect(passwordTitle).not.toBeInTheDocument();
		});

		it('should not render the password input', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const passwordInput = screen.queryByPlaceholderText('Contraseña');
			expect(passwordInput).not.toBeInTheDocument();
		});
	});

	describe('when moving along to the next step', () => {
		beforeEach(() => {
			mockUseLogin.mockReturnValue({
				state: {
					activeStep: 1,
					email: 'user@test.com',
					error: '',
				},
				dispatch: mockDispatch,
			});
		});

		it('should render the password title', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const passwordTitle = screen.getByText('Ingresá tu contraseña');
			expect(passwordTitle).toBeInTheDocument();
		});

		it('should render the password input', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const passwordInput = screen.getByPlaceholderText('Contraseña');
			expect(passwordInput).toBeInTheDocument();
		});

		it('should render the continue button', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const continueButton = screen.getByText('Continuar');
			expect(continueButton).toBeInTheDocument();
		});

		it('should not render the email title', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const emailTitle = screen.queryByText('¡Hola! Ingresá tu e-mail');
			expect(emailTitle).not.toBeInTheDocument();
		});

		it('should not render the email input', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const emailInput = screen.queryByPlaceholderText('Correo electrónico');
			expect(emailInput).not.toBeInTheDocument();
		});

		it('should not render the create account button', () => {
			renderWithLoginContext(<LoginStepperForm />);

			const createAccountButton = screen.queryByText('Crear cuenta');
			expect(createAccountButton).not.toBeInTheDocument();
		});
	});
});
