import { Box, styled } from '@mui/material';

export const BodyCenter = styled(Box)(({ theme }) => ({
	minHeight: 'calc(100vh - 64px)',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '20px',
	backgroundColor: theme.palette.grey[800],
}));
