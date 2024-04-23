import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import { AppBarGreen, ButtonNavGreen } from 'DMH/shared/styled/Header';

const HeaderAccount: FC = () => {
	const router = useRouter();
	const pathname: string = router.asPath;

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBarGreen>
				<Toolbar
					sx={{
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between',
					}}
				>
					<Link href='/' passHref>
						<div>
							<Image
								src='/dh-logo.svg'
								alt={'logo DMH'}
								width={86}
								height={33}
								style={{ cursor: 'pointer' }}
							/>
						</div>
					</Link>
					{pathname === '/register' && (
						<Box sx={{ display: { sm: 'block' } }}>
							<ButtonNavGreen variant='contained' href='/login'>
								Iniciar sesión
							</ButtonNavGreen>
						</Box>
					)}
				</Toolbar>
			</AppBarGreen>
		</Box>
	);
};

export default HeaderAccount;
