import axios from 'axios';
const BASE_URL = 'https://manager.pcghana.org/';
//const PRIVATE_URL = 'https://lab.rxhealthbeta.com/';

export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});
