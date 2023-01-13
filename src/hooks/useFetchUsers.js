import { useQuery } from 'react-query';
import { axiosRequest } from '../utils/axios-utils';

const fetchUsers = () => {
	return axiosRequest({ url: 'users' });
};

export const useFetchUsers = () => {
	return useQuery('user_list', fetchUsers);
};
