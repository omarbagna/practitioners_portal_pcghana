import React from 'react';
import { Link } from 'react-router-dom';

import { LogoWhite } from '../../assets';

import { Avatar } from '@mui/material';
import { useStateContext } from '../../context/StateContext';
import { useAuthContext } from '../../context/AuthContext';
//import { useAuthContext } from '../../context/AuthContext';

const NavBar = () => {
	const { user } = useAuthContext();

	const { viewUserModal, setViewUserModal } = useStateContext();

	//const { user } = useAuthContext();

	return (
		<div className="fixed z-50 bg-transparent top-0 left-0 w-full h-fit flex justify-center items-start lg:px-5">
			<div className="bg-gradient-to-b from-[#0404FF] to-blue-600 w-full lg:w-11/12 h-fit lg:rounded-b-2xl shadow-blue-400/30 shadow-lg flex justify-between items-center py-2 px-5 overflow-hidden">
				<Link
					to="/"
					className="transition-all duration-150 ease-in hover:scale-105 flex justify-center items-center p-2 cursor-pointer">
					<img
						className="object-contain h-10 lg:h-12 cursor-pointer"
						src={LogoWhite}
						alt="pharmacy council logo"
					/>
				</Link>

				<div
					className="w-fit h-fit cursor-pointer transition-all duration-150 ease-in hover:shadow-xl hover:scale-105"
					onClick={() => setViewUserModal(!viewUserModal)}>
					<Avatar
						src={`https://manager.pcghana.org/assets/images/pharmacists_pictures/${user?.picture}`}
						className="uppercase"
						alt="profile">
						{user?.first_name[0]}
						{user?.last_name[0]}
					</Avatar>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
