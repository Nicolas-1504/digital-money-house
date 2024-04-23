import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface Props {
	type?: string;
	name: string;
	label?: string;
	placeholder: string;
	required?: boolean;
	passwordAdornment?: boolean;
}

const ControlledTextInput: FC<Props> = ({
	type,
	name,
	label,
	placeholder,
	required,
	passwordAdornment,
}: Props) => {
	const { control } = useFormContext();

	const {
		field: { onChange, value, ref },
		formState: { errors },
	} = useController<Record<string, string>>({
		name: name,
		control,
	});

	const [show, setShow] = useState(true);

	useEffect(() => {
		passwordAdornment && setShow(false);
	}, []);

	return (
		<Box mb={'15px'} width={'100%'}>
			<TextField
				type={type || (show ? 'text' : 'password')}
				onChange={onChange}
				value={value || ''}
				label={label || ''}
				placeholder={placeholder}
				inputRef={ref}
				fullWidth
				error={!!errors[name]}
				helperText={`${errors[name]?.message || ''}`}
				sx={{
					'& .MuiOutlinedInput-root': {
						backgroundColor: 'white',
						borderRadius: '10px',
					},
				}}
				required={required || false}
				InputProps={
					passwordAdornment
						? {
								endAdornment: show ? (
									<IconButton onClick={() => setShow(false)}>
										<VisibilityOff />
									</IconButton>
								) : (
									<IconButton onClick={() => setShow(true)}>
										<Visibility />
									</IconButton>
								),
						  }
						: {}
				}
			/>
		</Box>
	);
};

export default ControlledTextInput;
