import Register from 'DMH/pages/register/index';
import { render, screen, waitFor } from '@testing-library/react';
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

describe('RegisterPage', () => {
	describe('when rendering the page logged out', () => {
		beforeEach(() => {
			clearLocalStorage();
		});
		it('should render the title', () => {
			render(<Register />);

			const registerTitle = screen.getAllByText('Crear cuenta')[0];
			expect(registerTitle).toBeInTheDocument();
		});
	});

	describe('when rendering the page logged in', () => {
		beforeEach(() => {
			setLocalStorage({ token: 'fakeToken' });
		});
		it('should not render the title', () => {
			render(<Register />);

			const nameInput = screen.queryByPlaceholderText('Nombre*');
			expect(nameInput).not.toBeInTheDocument();
		});

		it('should redirect to the home page', async () => {
			render(<Register />);

			await waitFor(() => {
				expect(mockPush).toBeCalledWith('/home');
			});
		});
	});
});
