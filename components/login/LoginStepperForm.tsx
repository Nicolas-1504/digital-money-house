import { Grid } from '@mui/material';
import useLogin from 'DMH/context/login/useLogin';
import React from 'react';
import EmailForm from 'DMH/components/login/EmailForm';
import PasswordForm from 'DMH/components/login/PasswordForm';
import { BodyCenter } from 'DMH/shared/styled/BodyCenter';

const LoginStepperForm = () => {
	const { state } = useLogin();

	return (
		<BodyCenter>
			<Grid container justifyContent={'center'}>
				<Grid item xs={12} md={6} lg={4} xl={4}>
					{state.activeStep === 0 && <EmailForm />}
					{state.activeStep === 1 && <PasswordForm />}
				</Grid>
			</Grid>
		</BodyCenter>
	);
};

export default LoginStepperForm;
