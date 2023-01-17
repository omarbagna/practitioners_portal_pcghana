import {
	Dialog,
	DialogBody,
	DialogHeader,
	Typography,
} from '@material-tailwind/react';
import { Avatar } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
//import { BiArrowBack } from 'react-icons/bi';
import { ButtonComponent, DefaultInput } from '../../components';
import { useAuthContext } from '../../context/AuthContext';
import { useStateContext } from '../../context/StateContext';

const UserModal = () => {
	const { viewUserModal, setViewUserModal } = useStateContext();
	const { user, logout } = useAuthContext();

	const [openLogout, setOpenLogout] = useState(false);
	const [openProfile, setOpenProfile] = useState(false);
	const [size, setSize] = useState('xl');
	const [isVisible, setIsVisible] = useState(false);

	const { handleSubmit, control } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			email: user?.email,
			currentPassword: '',
			newPassword: '',
			repeatNewPassword: '',
		},
	});

	const handleProfile = (data) => {
		console.log(data);
		setViewUserModal(false);
	};

	const handleOpenLogout = (value) => {
		setSize(value ? value : 'xs');
		setOpenLogout(!openLogout);
	};

	const handleOpenProfile = (value) => {
		setSize(value ? value : 'xs');
		setOpenProfile(!openProfile);
	};

	const visibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<AnimatePresence mode="wait">
			{viewUserModal && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setViewUserModal(false)}
						className="fixed z-40 flex justify-end items-start pr-3 pt-16 md:pr-5 lg:pr-16 xl:pr-20 top-0 w-full overflow-hidden h-full bg-black/50 backdrop-blur-sm">
						<motion.div
							onClick={(e) => e.stopPropagation()}
							initial={{ y: -200 }}
							animate={{ y: 0 }}
							exit={{ y: -200 }}
							transition={{ duration: 0.5, type: 'tween' }}
							//style={{ color: currentColor.code }}
							className="w-fit h-fit flex flex-col gap-3 justify-center lg:justify-start items-center text-white bg-gradient-to-b from-blue-600 to-[#0404FF]  rounded-b-2xl backdrop-blur-sm p-3  lg:py-10 lg:px-5">
							{/*
							<div className="flex w-full gap-5 justify-between items-center lg:px-1 mb-3 lg:mb-6">
								<div className="flex justify-start items-center gap-5">
									<span
										onClick={() => setViewProfile(false)}
										className="cursor-pointer transition-all duration-150 ease-in-out hover:scale-105 text-base lg:text-2xl rounded-md bg-black/30 p-1">
										<BiArrowBack />
									</span>
								</div>
								<Typography
									variant="h3"
									className="capitalize text-lg lg:text-xl pb-1">
									User Profile
								</Typography>
							</div>

							*/}

							<div className="hidden lg:block cursor-pointer p-3 rounded-xl transition-all duration-150 ease-in hover:bg-white/30 hover:shadow-lg">
								<Typography
									variant="paragraph"
									className="font-medium text-lg text-center capitalize"
									onClick={() => handleOpenProfile('xs')}>
									<strong>my profile</strong>
								</Typography>
							</div>

							<div className="block lg:hidden cursor-pointer p-2 rounded-xl transition-all duration-150 ease-in hover:bg-white/30">
								<Typography
									variant="paragraph"
									className="font-medium text-base text-center capitalize"
									onClick={() => handleOpenProfile('xl')}>
									<strong>my profile</strong>
								</Typography>
							</div>

							<div className="hidden lg:block">
								<ButtonComponent
									color="red"
									title="logout"
									onClick={() => handleOpenLogout('xs')}
								/>
							</div>

							<div className="block lg:hidden">
								<ButtonComponent
									color="red"
									title="logout"
									onClick={() => handleOpenLogout('xl')}
								/>
							</div>
						</motion.div>
					</motion.div>

					<Dialog
						open={openProfile}
						handler={handleOpenProfile}
						size={size}
						className="overflow-y-auto">
						<DialogHeader className="bg-gradient-to-b from-[#0404FF] to-[#121B67]">
							<div className="grid place-items-center w-full h-full">
								<Typography
									variant="h3"
									color="white"
									className="text-center capitalize">
									my profile
								</Typography>
							</div>
						</DialogHeader>
						<DialogBody divider className="w-full flex flex-col gap-10 px-6">
							<div className="w-full h-16 flex justify-start items-center gap-6">
								<Avatar
									src={`https://manager.pcghana.org/assets/images/pharmacists_pictures/${user?.picture}`}
									className="uppercase"
									alt="profile">
									{user?.first_name[0]}
									{user?.last_name[0]}
								</Avatar>

								<span>
									<Typography
										variant="h3"
										color="black"
										className="capitalize font-semibold text-lg">
										{user?.full_name}
									</Typography>
									<Typography
										variant="paragraph"
										className="capitalize font-thin text-xs text-gray-600">
										<em>{user?.type}</em>
									</Typography>
								</span>
							</div>

							<form
								onSubmit={handleSubmit(handleProfile)}
								className="flex flex-col w-full justify-center items-center gap-5">
								<Controller
									control={control}
									name="email"
									rules={{
										required: 'Please enter email',
									}}
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<DefaultInput
											{...field}
											ref={ref}
											helpertext={invalid ? error.message : null}
											name="email"
											label="Email"
											type="email"
											//value={user?.email}
											//disabled
											required
										/>
									)}
								/>

								<Typography
									variant="h3"
									color="black"
									className="capitalize font-medium text-base">
									change password
								</Typography>
								<Controller
									control={control}
									name="currentPassword"
									rules={{
										required: 'Please enter current password',
									}}
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<DefaultInput
											{...field}
											ref={ref}
											//error={invalid || loginError}
											helpertext={invalid ? error.message : null}
											name="currentPassword"
											label="Current Password"
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
								<Controller
									control={control}
									name="newPassword"
									rules={{
										required: 'Please enter new password',
									}}
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<DefaultInput
											{...field}
											ref={ref}
											//error={invalid || loginError}
											helpertext={invalid ? error.message : null}
											name="newPassword"
											label="New Password"
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
								<Controller
									control={control}
									name="repeatNewPassword"
									rules={{
										required: 'Please enter repeat new password',
									}}
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<DefaultInput
											{...field}
											ref={ref}
											//error={invalid || loginError}
											helpertext={invalid ? error.message : null}
											name="repeatNewPassword"
											label="Repeat New Password"
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

								<div className="flex w-full justify-center items-center gap-5">
									<ButtonComponent
										title="cancel"
										reset
										onClick={() => {
											handleOpenProfile(size);
											setViewUserModal(false);
										}}
									/>
									<ButtonComponent type="submit" title="update" />
								</div>
							</form>
						</DialogBody>
					</Dialog>

					<Dialog
						open={openLogout}
						handler={handleOpenLogout}
						size={size}
						className="overflow-y-auto">
						<DialogBody className="w-full flex flex-col gap-10">
							<div className="grid place-items-center  w-full">
								<Typography
									variant="h3"
									className="text-center text-base md:text-lg">
									Are you sure you want to logout?
								</Typography>
							</div>
							<div className="flex w-full justify-center items-center gap-5">
								<ButtonComponent
									title="cancel"
									onClick={() => {
										handleOpenLogout(size);
										setViewUserModal(false);
									}}
								/>
								<ButtonComponent
									title="logout"
									reset
									onClick={() => {
										handleOpenLogout(size);
										setViewUserModal(false);
										logout();
									}}
								/>
							</div>
						</DialogBody>
					</Dialog>
				</>
			)}
		</AnimatePresence>
	);
};

export default UserModal;
