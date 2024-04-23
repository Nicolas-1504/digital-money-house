import { Typography, styled } from '@mui/material';

export const FormError = styled(Typography)(({ theme }) => ({
	color: theme.palette.error.main,
	textAlign: 'center',
	fontStyle: 'italic',
}));
