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
import { FaRegUser, FaSignOutAlt } from 'react-icons/fa';
import { ButtonComponent, DefaultInput } from '../../components';
import { useAuthContext } from '../../context/AuthContext';
import { useStateContext } from '../../context/StateContext';

const UserModal = () => {
	const { viewUserModal, setViewUserModal } = useStateContext();
	const { user, logout } = useAuthContext();

	const [openLogout, setOpenLogout] = useState(false);
	const [openProfile, setOpenProfile] = useState(false);
	const [size, setSize] = useState('xl');

	const { handleSubmit, control } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			email: user?.email,
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

	return (
		<AnimatePresence mode="wait">
			{viewUserModal && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setViewUserModal(false)}
						className="fixed z-40 flex justify-end items-start pr-3 pt-24 md:pr-5 lg:pr-16 xl:pr-20 top-0 w-full overflow-hidden h-full bg-black/20 backdrop-blur-sm">
						<motion.div
							onClick={(e) => e.stopPropagation()}
							initial={{ y: -200 }}
							animate={{ y: 0 }}
							exit={{ y: -200 }}
							transition={{ duration: 0.5, type: 'tween' }}
							className="w-fit h-fit flex flex-col gap-5 justify-center lg:justify-start items-center text-blue-600 bg-gradient-to-b from-blue-gray-50 to-white shadow-xl rounded-2xl backdrop-blur-sm p-3  lg:py-5 lg:px-5">
							<div className="hidden lg:flex cursor-pointer p-4 rounded-lg transition-all duration-150 ease-in-out hover:bg-blue-600 hover:text-white hover:shadow-lg justify-center items-center gap-3">
								<FaRegUser className="shrink-0 text-xl" />
								<Typography
									variant="paragraph"
									className="font-medium text-lg text-center capitalize"
									onClick={() => handleOpenProfile('xs')}>
									my profile
								</Typography>
							</div>

							<div className="flex lg:hidden cursor-pointer p-3 rounded-lg transition-all duration-150 ease-in hover:bg-blue-600 hover:text-white hover:shadow-lg justify-center items-center gap-3">
								<FaRegUser className="shrink-0 text-lg" />
								<Typography
									variant="paragraph"
									className="font-medium text-base text-center capitalize"
									onClick={() => handleOpenProfile('xl')}>
									my profile
								</Typography>
							</div>

							<div className="w-full h-[2px] rounded-full bg-blue-gray-200" />

							<div className="hidden lg:block">
								<ButtonComponent
									color="red"
									title={
										<>
											<FaSignOutAlt className="shrink-0 text-xl" />
											logout
										</>
									}
									onClick={() => handleOpenLogout('xs')}
								/>
							</div>

							<div className="block lg:hidden">
								<ButtonComponent
									color="red"
									title={
										<>
											<FaSignOutAlt className="shrink-0 text-lg" />
											logout
										</>
									}
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
						<DialogHeader className="bg-blue-600">
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
											labelProps={{ style: { color: '#000' } }}
											disabled
											required
										/>
									)}
								/>

								<div className="flex w-full justify-center items-center gap-5">
									<ButtonComponent
										title="close"
										reset
										onClick={() => {
											handleOpenProfile(size);
											setViewUserModal(false);
										}}
									/>
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
