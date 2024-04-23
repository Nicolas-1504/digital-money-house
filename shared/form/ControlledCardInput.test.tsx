import { screen } from '@testing-library/react';
import { renderWithForm } from 'DMH/test/testing.helpers';
import ControlledCardInput from 'DMH/shared/form/ControlledCardInput';

describe('ControlledCardInput', () => {
	describe('when rendering', () => {
		it('should render a textbox', () => {
			renderWithForm(<ControlledCardInput name={'cvc'} placeholder={'Código de seguridad*'} onFocus={()=>{}} passwordAdornment />);
			const input = screen.getByPlaceholderText('Código de seguridad*');
			const eye = screen.getByTestId('VisibilityIcon');
			expect(input).toBeInTheDocument();
			expect(eye).toBeInTheDocument();
			expect(input).toHaveValue('');
		});

		it('should render a textbox with a default value', () => {
			renderWithForm(<ControlledCardInput name={'cvc'} placeholder={'Código de seguridad*'} onFocus={()=>{}} />, {
				defaultValues: { cvc: '123' },
			});
			const input = screen.getByPlaceholderText('Código de seguridad*');
			expect(input).toBeInTheDocument();
			expect(input).toHaveValue('123');
		});
	});
});