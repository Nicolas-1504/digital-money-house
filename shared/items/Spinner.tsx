import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Spinner = () => {
	return (
		<Box display={'flex'} justifyContent={'center'} padding={'20px'}>
			<CircularProgress />
		</Box>
	);
};

export default Spinner;
