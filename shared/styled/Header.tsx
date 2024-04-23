import { AppBar, Button, Paper, styled } from '@mui/material';

export const AppBarGrey = styled(AppBar)(({ theme }) => ({
	boxShadow: 'none',
	height: '64px',
	justifyContent: 'center',
	backgroundColor: theme.palette.grey[800],
	color: theme.palette.primary.main,
	zIndex: '9999',
	[theme.breakpoints.down('sm')]: {
		zIndex: '1',
	},
}));

export const ButtonNavGrey = styled(Button)({
	textTransform: 'capitalize',
	fontWeight: '700',
});

export const ButtonNavGreen = styled(Button)(({ theme }) => ({
	marginX: '10px',
	textTransform: 'capitalize',
	fontWeight: '700',
	backgroundColor: theme.palette.grey[600],
	color: '#FFF',
	'&:hover': {
		border: `1px solid ${theme.palette.grey[600]}`,
		color: theme.palette.grey[600],
		backgroundColor: theme.palette.primary.main,
	},
}));

export const PaperDrawer = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.grey[600],
	height: '126px',
	borderRadius: '0',
	display: 'flex',
	alignItems: 'end',
	color: theme.palette.primary.main,
}));

export const AppBarGreen = styled(AppBar)(({ theme }) => ({
	boxShadow: 'none',
	height: '64px',
	justifyContent: 'center',
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.grey[600],
	zIndex: '9999',
	[theme.breakpoints.down('sm')]: {
		zIndex: '1',
	},
}));
