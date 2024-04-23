import { Box, styled } from '@mui/material';

export const SuccessIconBox = styled(Box)(({ theme }) => ({
	height: '150px',
	width: '150px',
	[theme.breakpoints.up('md')]: {
		height: '100px',
		width: '100px',
	},
}));
