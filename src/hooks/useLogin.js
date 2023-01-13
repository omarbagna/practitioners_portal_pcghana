import axios from 'axios';
import { useQuery } from 'react-query';
//import { axiosRequest } from '../utils/axios-utils';

const fetchUser = () => {
	return axios.get('https://mighty-vanilla-saga.glitch.me/users');
};

export const useLogin = (onSuccess, email, password) => {
	return useQuery('active_user', fetchUser, {
		enabled: false,
		onSuccess,
		select: (data) => {
			const user = data.data.filter(
				(user) => user.email === email && user.password === password
			);
			return user;
		},
	});
};
