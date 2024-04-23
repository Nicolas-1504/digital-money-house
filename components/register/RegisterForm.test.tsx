import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import RegisterForm from 'DMH/components/register/RegisterForm';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
	pathname: '/',
	push: mockPush,
}));

describe('RegisterForm', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		render(<RegisterForm />);
	});
	describe('when rendering page', () => {
		it('should render the title', () => {
			const registerTitle = screen.getAllByText('Crear cuenta')[0];
			expect(registerTitle).toBeInTheDocument();
		});

		it('should render the 7 inputs', () => {
			const nameInput = screen.getByPlaceholderText('Nombre*');
			const surnameInput = screen.getByPlaceholderText('Apellido*');
			const dniInput = screen.getByPlaceholderText('DNI*');
			const emailInput = screen.getByPlaceholderText('Correo electrónico*');
			const passwordInput = screen.getByPlaceholderText('Contraseña*');
			const confirmPasswordInput = screen.getByPlaceholderText('Confirmar Contraseña*');
			const phoneInput = screen.getByPlaceholderText('Teléfono*');

			expect(nameInput).toBeInTheDocument();
			expect(surnameInput).toBeInTheDocument();
			expect(dniInput).toBeInTheDocument();
			expect(emailInput).toBeInTheDocument();
			expect(passwordInput).toBeInTheDocument();
			expect(confirmPasswordInput).toBeInTheDocument();
			expect(phoneInput).toBeInTheDocument();
		});

		it('should render the register button', () => {
			const registerButton = screen.getAllByText('Crear cuenta')[1];
			expect(registerButton).toBeInTheDocument();
		});
	});

	describe('when submitting the form successfully', () => {
		beforeEach(async () => {
			const nameInput = screen.getByPlaceholderText('Nombre*');
			const surnameInput = screen.getByPlaceholderText('Apellido*');
			const dniInput = screen.getByPlaceholderText('DNI*');
			const emailInput = screen.getByPlaceholderText('Correo electrónico*');
			const passwordInput = screen.getByPlaceholderText('Contraseña*');
			const confirmPasswordInput = screen.getByPlaceholderText('Confirmar Contraseña*');
			const phoneInput = screen.getByPlaceholderText('Teléfono*');
			const registerButton = screen.getAllByText('Crear cuenta')[1];

			await userEvent.type(nameInput, 'test');
			await userEvent.type(surnameInput, 'user');
			await userEvent.type(dniInput, '12345678');
			await userEvent.type(emailInput, 'usertest@test.com');
			await userEvent.type(passwordInput, 'Test123*');
			await userEvent.type(confirmPasswordInput, 'Test123*');
			await userEvent.type(phoneInput, '12345678');
			userEvent.click(registerButton);
		});
		it('should redirect to the register success page', async () => {
			await waitFor(() => {
				expect(mockPush).toBeCalledWith('/register/success');
			});
		});

		it('should not diplay the error message', async () => {
			await waitFor(() => {
				const errorMessage = screen.queryByText('Completa los campos requeridos');
				expect(errorMessage).not.toBeInTheDocument();
			});
		});
	});

	describe('when submitting with empty inputs', () => {
		beforeEach(() => {
			render(<RegisterForm />);
		});
		it('should display the error message', async () => {
			const registerButton = screen.getAllByText('Crear cuenta')[1];
			userEvent.click(registerButton);

			await waitFor(() => {
				const errorMessage = screen.getByText('Completa los campos requeridos');
				expect(errorMessage).toBeInTheDocument();
			});
		});
	});

	describe('when submitting with a registered email', () => {
		it('should display the error message', async () => {
			const nameInput = screen.getByPlaceholderText('Nombre*');
			const surnameInput = screen.getByPlaceholderText('Apellido*');
			const dniInput = screen.getByPlaceholderText('DNI*');
			const emailInput = screen.getByPlaceholderText('Correo electrónico*');
			const passwordInput = screen.getByPlaceholderText('Contraseña*');
			const confirmPasswordInput = screen.getByPlaceholderText('Confirmar Contraseña*');
			const phoneInput = screen.getByPlaceholderText('Teléfono*');
			const registerButton = screen.getAllByText('Crear cuenta')[1];

			await userEvent.type(nameInput, 'test');
			await userEvent.type(surnameInput, 'user');
			await userEvent.type(dniInput, '12345678');
			await userEvent.type(emailInput, 'exists@test.com');
			await userEvent.type(passwordInput, 'Test123*');
			await userEvent.type(confirmPasswordInput, 'Test123*');
			await userEvent.type(phoneInput, '12345678');
			userEvent.click(registerButton);

			await waitFor(() => {
				const errorMessage = screen.getByText('Email already registered');
				expect(errorMessage).toBeInTheDocument();
			});
		});
	});
});
