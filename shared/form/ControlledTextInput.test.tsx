import { screen } from '@testing-library/react';
import { renderWithForm } from 'DMH/test/testing.helpers';
import ControlledTextInput from 'DMH/shared/form/ControlledTextInput';

describe('ControlledTextInput', () => {
	describe('when rendering', () => {
		it('should render a textbox', () => {
			renderWithForm(<ControlledTextInput name={'email'} placeholder={'Correo electrónico'} />);
			const input = screen.getByPlaceholderText('Correo electrónico');
			expect(input).toBeInTheDocument();
			expect(input).toHaveValue('');
		});

		it('should render a textbox with a default value', () => {
			renderWithForm(<ControlledTextInput name={'email'} placeholder={'Correo electrónico'} />, {
				defaultValues: { email: 'usertest@gmail.com' },
			});
			const input = screen.getByPlaceholderText('Correo electrónico');
			expect(input).toBeInTheDocument();
			expect(input).toHaveValue('usertest@gmail.com');
		});
	});
});
