import { Typography, styled } from '@mui/material';

export const SuccessTitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.contrastText,
	fontWeight: '400',
	fontSize: '34px',
	textAlign: 'center',
	[theme.breakpoints.up('md')]: {
		fontSize: '64px',
	},
}));
