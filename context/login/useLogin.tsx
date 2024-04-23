import { ILoginContext } from 'DMH/utils/types/loginContext.types';
import { useContext } from 'react';
import { LoginContext } from './loginContext';

const useLogin = (): ILoginContext => {
	const context = useContext(LoginContext);
	if (!context) {
		throw new Error('useLogin must be used within a LoginProvider');
	}
	return context;
};

export default useLogin;
