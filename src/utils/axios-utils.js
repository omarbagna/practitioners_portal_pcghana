import axios from 'axios';

const client = axios.create({
	baseURL: 'https://manager.pcghana.org/',
});

export const axiosRequest = ({ ...options }) => {
	client.defaults.headers.common.Authorization = 'Token';

	const onSuccess = (response) => response;
	const onError = (err) => err;

	return client(options).then(onSuccess).catch(onError);
};
