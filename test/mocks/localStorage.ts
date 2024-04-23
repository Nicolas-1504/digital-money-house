export const setLocalStorage = (data: { token: string }) => {
	window.localStorage.setItem('auth', JSON.stringify(data));
};

export const clearLocalStorage = () => {
	localStorage.removeItem('auth');
};
