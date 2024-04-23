import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import NewCardForm from 'DMH/components/newCard/NewCardForm';
import userEvent from '@testing-library/user-event';
import { getAccountStorage } from 'DMH/utils/account';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
	push: mockPush,
}));

jest.mock("DMH/utils/account");
const mockGetAccountStorage = getAccountStorage as jest.MockedFunction<typeof getAccountStorage>

describe('NewCardForm', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		render(<NewCardForm />);
	});
	describe('when rendering page', () => {

		it('should render the 7 inputs', () => {
			const numberInput = screen.getByPlaceholderText('Número de la tarjeta*');
			const nameInput = screen.getByPlaceholderText('Nombre y apellido*');
			const expDateInput = screen.getByPlaceholderText('Fecha de vencimiento*');
			const codInput = screen.getByPlaceholderText('Código de seguridad*');

			expect(numberInput).toBeInTheDocument();
			expect(nameInput).toBeInTheDocument();
			expect(expDateInput).toBeInTheDocument();
			expect(codInput).toBeInTheDocument();
		});

		it('should render the continue button', () => {
			const continueButton = screen.getByText('Continuar');
			expect(continueButton).toBeInTheDocument();
		});
	});

	describe('when submitting the form successfully', () => {
		beforeEach(async () => {
			mockGetAccountStorage.mockReturnValue({
				id: 5,
			})
			const numberInput = screen.getByPlaceholderText('Número de la tarjeta*');
			const nameInput = screen.getByPlaceholderText('Nombre y apellido*');
			const expDateInput = screen.getByPlaceholderText('Fecha de vencimiento*');
			const codInput = screen.getByPlaceholderText('Código de seguridad*');
            const continueButton = screen.getByText('Continuar');

			await userEvent.type(numberInput, '4242424242424242');
			await userEvent.type(nameInput, 'test');
			await userEvent.type(expDateInput, '11/2023');
			await userEvent.type(codInput, '123');
			userEvent.click(continueButton);
		});
		it('should redirect to the list of cards page', async () => {
			await waitFor(() => {
				expect(mockPush).toBeCalledWith('/cards');
			});
		});

	});

	describe('when submitting but the api returns an error', () => {
		beforeEach(async () => {
			mockGetAccountStorage.mockReturnValue({
				id: 6,
			})
			const numberInput = screen.getByPlaceholderText('Número de la tarjeta*');
			const nameInput = screen.getByPlaceholderText('Nombre y apellido*');
			const expDateInput = screen.getByPlaceholderText('Fecha de vencimiento*');
			const codInput = screen.getByPlaceholderText('Código de seguridad*');
            const continueButton = screen.getByText('Continuar');

			await userEvent.type(numberInput, '4242424242424242');
			await userEvent.type(nameInput, 'test');
			await userEvent.type(expDateInput, '11/2023');
			await userEvent.type(codInput, '123');
			userEvent.click(continueButton);
		});
		it('should display the error message', async () => {
			await waitFor(() => {
				const errorMessage = screen.getByText('failed test');
				expect(errorMessage).toBeInTheDocument();
			});
		});
	});
});
