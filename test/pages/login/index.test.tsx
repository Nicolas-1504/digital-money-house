import { renderWithLoginContext } from 'DMH/test/testing.helpers';
import Login from 'DMH/pages/login/index';
import { screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { clearLocalStorage, setLocalStorage } from 'DMH/test/mocks/localStorage';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
	pathname: '/',
	push: mockPush,
}));

describe('LoginPage', () => {
	describe('when rendering page logged out', () => {
		beforeEach(() => {
			clearLocalStorage();
		});
		it('should render the title', () => {
			renderWithLoginContext(<Login />);

			const emailTitle = screen.getByText('¡Hola! Ingresá tu e-mail');
			expect(emailTitle).toBeInTheDocument();
		});
	});

	describe('when rendering the page logged in', () => {
		beforeEach(() => {
			setLocalStorage({ token: 'fakeToken' });
		});
		it('should not render the title', () => {
			renderWithLoginContext(<Login />);

			const emailTitle = screen.queryByText('¡Hola! Ingresá tu e-mail');
			expect(emailTitle).not.toBeInTheDocument();
		});

		it('should redirect to the home page', async () => {
			renderWithLoginContext(<Login />);

			await waitFor(() => {
				expect(mockPush).toBeCalledWith('/home');
			});
		});
	});
});
