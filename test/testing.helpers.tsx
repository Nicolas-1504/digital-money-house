import { LoginProvider } from 'DMH/context/login/loginContext';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

export function renderWithLoginContext(ui: ReactElement, { defaultValues = {} } = {}) {
	const Wrapper: FC<PropsWithChildren> = ({ children }) => {
		return <LoginProvider>{children}</LoginProvider>;
	};

	return {
		...render(ui, { wrapper: Wrapper }),
	};
}

export function renderWithForm(ui: ReactElement, { defaultValues = {} } = {}) {
	const Wrapper: FC<PropsWithChildren> = ({ children }) => {
		const methods = useForm({ defaultValues });
		return <FormProvider {...methods}>{children}</FormProvider>;
	};

	return {
		...render(ui, { wrapper: Wrapper }),
	};
}
