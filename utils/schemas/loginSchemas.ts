import * as yup from 'yup';

export const emailSchema = yup.object({
	email: yup.string().email('Debes ingresar un formato de email válido').required(''),
});

export const passwordSchema = yup.object({
	password: yup.string().required(''),
});
