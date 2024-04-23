import { Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface FormBoxProps {
	title: string;
	children: ReactNode;
}

const FormBox = ({ title, children }: FormBoxProps) => {
	return (
		<>
			<Typography
				mb={'20px'}
				fontWeight={'bold'}
				fontSize={'20px'}
				sx={{ color: 'primary.contrastText' }}
				align={'center'}
			>
				{title}
			</Typography>
			{children}
		</>
	);
};

export default FormBox;
