import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import ButtonComponent from '../../components/reusable/Button/Button';
import { LogoDefault, LoginImage } from '../../assets';
import { Controller, useForm } from 'react-hook-form';
import { DefaultInput } from '../../components';
import { useAuthContext } from '../../context/AuthContext';
import { axiosPrivate } from '../../api/axios';
//import { LazyLoadImage } from 'react-lazy-load-image-component';
//import 'react-lazy-load-image-component/src/effects/blur.css';
//import { useLogin } from '../../hooks/useLogin';
//import toast from 'react-hot-toast';
import {
	AiFillEye,
	AiFillEyeInvisible,
	AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { SelectInput } from '../../components';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const LOGIN_URL = 'api/login';

const Login = () => {
	//const [userCredentials, setUserCredentials] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [forgotPassword, setForgotPassword] = useState(false);
	const [loginError, setLoginError] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const { login } = useAuthContext();

	const { handleSubmit, control } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			login_type: '',
			license_number: '',
			password: '',
		},
	});

	const formData = new FormData();

	/*const onSuccess = (data) => {
		if (data?.length < 1) {
			toast.error('Incorrect email or password. Try again');
			setLoginError(true);
		} else {
			setLoginError(false);
			UserLogin(data);
		}

		console.log({ data });
	};

	const { refetch, isLoading, isFetching } = useLogin(
		onSuccess,
		userCredentials.email,
		userCredentials.password
	);
*/

	useEffect(() => {
		localStorage.clear();
	}, []);

	const handleLogin = async (user) => {
		formData.append('username', user?.license_number.toUpperCase());
		formData.append('password', user?.password);
		formData.append('type', user?.login_type.toLowerCase());

		setIsLoading(true);

		try {
			const response = await axiosPrivate.post(LOGIN_URL, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response?.data?.status === '0') {
				setIsLoading(false);
				setLoginError(true);
				toast.error('Invalid Username or Password');
			} else if (response?.data?.status === '1') {
				setIsLoading(false);
				setLoginError(false);
				login(response?.data?.user_data);
				Navigate('/', { replace: true });
			}
		} catch (err) {
			let errMessage;
			if (err.response?.status === 400) {
				errMessage = 'Server Error';
				console.log(errMessage);
			}

			setLoginError(true);
			setIsLoading(false);
		}
	};

	const handleForgotPassword = (data) => {
		console.log({ data });
	};

	const visibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className="w-screen h-screen flex flex-row-reverse justify-center items-center overflow-hidden">
			<div className="hidden relative lg:w-full h-full lg:flex justify-center items-center overflow-hidden">
				<div className="absolute top-0 left-0 z-10 w-full h-full flex justify-end items-center bg-gradient-to-tl from-black">
					<div className="h-fit pr-10 flex justify-end items-center gap-3">
						<Typography
							variant="paragraph"
							className="font-light text-gray-100 text-right text-3xl">
							Securing the highest <br /> levels of pharmaceutical <br /> care
						</Typography>
						<div className="w-[6px] h-28 bg-blue-800 rounded-full" />
					</div>
				</div>
				<img
					src={LoginImage}
					alt="login"
					loading="lazy"
					//width={'100%'}
					//height={'100%'}

					className="object-cover object-left w-full h-full z-0"
				/>
			</div>
			<div className=" w-full lg:1/2 xl:w-3/5 h-full flex flex-col justify-center  items-center">
				<div className="w-full h-full flex justify-center items-center px-3 md:px-5 lg:px-16 xl:px-20">
					<Card className="w-full h-fit bg-white shadow-none">
						<CardBody className="flex flex-col gap-4 justify-start items-center">
							<div className="w-full flex justify-start items-center gap-3 mb-6">
								<img
									alt="logo"
									src={LogoDefault}
									className="object-contain w-16"
								/>
								<Typography
									variant="h3"
									className="font-light text-gray-800 text-left text-4xl">
									Practitioners' <br /> Portal
								</Typography>
							</div>
							<div className="w-full flex flex-col gap-3 justify-center items-center p-3 rounded-md bg-[#CCE5FF] mb-6">
								<Typography
									variant="paragraph"
									className="font-semibold text-[#185393] text-center text-base">
									The license or registration number must be typed in full as it
									was issued to you
								</Typography>
								<Typography
									variant="paragraph"
									className="font-medium text-[#185393] text-center text-base">
									For Pharmacists: <strong>PA XXX or HPA XXXX </strong>
									<br /> For Pharmacy Technicians: <strong>PT000/1990 </strong>
								</Typography>
							</div>
							{isLoading ? (
								<span className="w-full h-full text-4xl flex justify-center items-center">
									<AiOutlineLoading3Quarters className="animate-spin" />
								</span>
							) : forgotPassword ? (
								<form
									className="flex flex-col justify-center items-center gap-6 w-full"
									onSubmit={handleSubmit(handleForgotPassword)}>
									<Controller
										control={control}
										name="license_number"
										rules={{
											required: 'Please enter license number to Login',
										}}
										render={({
											field: { ref, ...field },
											fieldState: { error, invalid },
										}) => (
											<DefaultInput
												{...field}
												ref={ref}
												error={invalid || loginError}
												helpertext={invalid ? error.message : null}
												name="license_number"
												label="Full registration / License number"
												type="text"
												required
											/>
										)}
									/>

									<ButtonComponent
										title="reset password"
										type="submit"
										color="blue"
									/>
									<Typography
										variant="paragraph"
										onClick={() => setForgotPassword(false)}
										className="capitalize transition-all duration-150 ease-in-out text-sm underline hover:text-blue-600 cursor-pointer">
										back to login screen
									</Typography>
								</form>
							) : (
								<form
									className="flex flex-col justify-center items-center gap-6 w-full"
									onSubmit={handleSubmit(handleLogin)}>
									<Controller
										control={control}
										name="login_type"
										rules={{
											required: 'Please select Login Type',
										}}
										render={({
											field: { ref, ...field },
											fieldState: { error, invalid },
										}) => (
											<SelectInput
												{...field}
												ref={ref}
												error={invalid || loginError}
												helpertext={invalid ? error.message : null}
												name="login_type"
												label="Select Login Type *"
												options={[
													{
														name: 'pharmacist',
														value: 'pharmacist',
													},
													{
														name: 'pharmacy technician',
														value: 'pharmacist',
													},
													{
														name: 'intern',
														value: 'pharmacist',
													},
												]}
												required
											/>
										)}
									/>
									<Controller
										control={control}
										name="license_number"
										rules={{
											required: 'Please enter license number to Login',
										}}
										render={({
											field: { ref, ...field },
											fieldState: { error, invalid },
										}) => (
											<DefaultInput
												{...field}
												ref={ref}
												error={invalid || loginError}
												helpertext={invalid ? error.message : null}
												name="license_number"
												label="Full registration / License number"
												type="text"
												required
											/>
										)}
									/>
									<Controller
										control={control}
										name="password"
										rules={{
											required: 'Please enter Password',
										}}
										render={({
											field: { ref, ...field },
											fieldState: { error, invalid },
										}) => (
											<DefaultInput
												{...field}
												ref={ref}
												error={invalid || loginError}
												helpertext={invalid ? error.message : null}
												name="password"
												label="Password"
												type={isVisible ? 'text' : 'password'}
												icon={
													isVisible ? (
														<AiFillEyeInvisible onClick={visibility} />
													) : (
														<AiFillEye onClick={visibility} />
													)
												}
												required
											/>
										)}
									/>

									<ButtonComponent
										width
										title="login"
										type="submit"
										color="blue"
									/>
									<Typography
										variant="paragraph"
										onClick={() => setForgotPassword(true)}
										className="capitalize w-full transition-all duration-150 ease-in-out text-left text-xs underline hover:text-blue-600 cursor-pointer">
										<em>forgot password? click here</em>
									</Typography>
								</form>
							)}
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Login;
