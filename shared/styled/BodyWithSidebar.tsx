import { Box, styled } from '@mui/material';

export const BodyWithSidebar = styled(Box)(({ theme }) => ({
	width: '100%',
	padding: '30px 60px',
	minHeight: 'calc(100vh - 64px)',
	marginLeft: '240px',
	backgroundColor: theme.palette.grey[100],
	[theme.breakpoints.down('sm')]: {
		margin: '0px',
	},
	[theme.breakpoints.down('md')]: {
		padding: '30px 20px',
	},
}));
