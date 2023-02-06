import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import ButtonComponent from '../../components/reusable/Button/Button';
import { LogoDefault } from '../../assets';
import { Controller, useForm } from 'react-hook-form';
import { DefaultInput } from '../../components';
import { axiosPrivate } from '../../api/axios';
//import toast from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FORGOT_PASSWORD_URL = 'api/send_reset_password_link_email';

const ResetPassword = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [loginError, setLoginError] = useState(false);

	const { handleSubmit, control } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			user_registration_number: '',
		},
	});

	const formData = new FormData();

	useEffect(() => {
		localStorage.clear();
	}, []);

	const handleForgotPassword = async (data) => {
		//console.log({ data });
		formData.append(
			'registration_number',
			data?.user_registration_number.toUpperCase()
		);

		setIsLoading(true);

		try {
			const response = await axiosPrivate.post(FORGOT_PASSWORD_URL, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response?.data?.status === '0' || response?.data?.status === '-1') {
				setIsLoading(false);
				setLoginError(true);
				toast.error('Invalid License number');
			} else if (response?.data?.status === '1') {
				setIsLoading(false);
				setLoginError(false);
				toast.success('Reset link sent to your email.');
				navigate('/login', { replace: true });
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
					//src={LoginImage}
					src="https://raw.githubusercontent.com/omarbagna/neppImages/main/home.png"
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
							) : (
								<form
									className="flex flex-col justify-center items-center gap-6 w-full"
									onSubmit={handleSubmit(handleForgotPassword)}>
									<Controller
										control={control}
										name="user_registration_number"
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
												name="user_registration_number"
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
										onClick={() => navigate('/login')}
										className="capitalize transition-all duration-150 ease-in-out text-sm underline hover:text-blue-600 cursor-pointer">
										back to login screen
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

export default ResetPassword;
