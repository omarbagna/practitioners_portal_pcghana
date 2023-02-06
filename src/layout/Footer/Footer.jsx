import React from 'react';

import { LogoWhite } from '../../assets';

import { Typography } from '@material-tailwind/react';
import { BiPhone, BiWorld } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';

const Footer = () => {
	//const { user } = useAuthContext();

	return (
		<div className="bg-transparent bottom-0 left-0 w-full h-fit">
			<div className="bg-gradient-to-b  from-blue-600 to-[#0404FF] w-full h-fit flex flex-col justify-center gap-5 items-center py-2 px-5 overflow-hidden">
				<div className="flex justify-center items-center gap-2 text-white">
					<BiWorld className="shrink-0 text-3xl" />
					<Typography
						variant="h4"
						className="font-medium text-2xl capitalize"
						color="white">
						Reach Us
					</Typography>
					<a
						href="https://pcghana.org"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-all duration-150 ease-in hover:scale-105 flex justify-center items-center p-2 cursor-pointer">
						<img
							className="object-contain h-10 lg:h-12 cursor-pointer"
							src={LogoWhite}
							alt="pharmacy council logo"
						/>
					</a>
				</div>
				<Typography
					variant="paragraph"
					className="font-light w-full lg:w-4/5 text-gray-300 bg-blue-gray-50/30 rounded-lg p-3 text-lg text-center">
					You can find general information about the Council, procedures,
					policies, and download various application forms. The phone numbers of
					the various regional offices and head office are also available there.
				</Typography>

				<div className="w-full flex flex-wrap justify-around items-center gap-5">
					<a
						className="transition-all duration-150 ease-in flex justify-center items-center gap-3 text-white/80 hover:text-white p-3 shadow-md hover:shadow-xl rounded-lg bg-white/30"
						href="mailto:info@pcghana.org"
						target="_blank"
						rel="noopener noreferrer">
						<MdOutlineMarkEmailUnread className="shrink-0 text-xl" />
						info@pcghana.org
					</a>
					<a
						className="transition-all duration-150 ease-in flex justify-center items-center gap-3 text-white/80 hover:text-white p-3 shadow-md hover:shadow-xl rounded-lg bg-white/30"
						href="tel:+233302680150"
						target="_blank"
						rel="noopener noreferrer">
						<BiPhone className="shrink-0 text-xl" /> +233302680150
					</a>
					<a
						className="transition-all duration-150 ease-in flex justify-center items-center gap-3 text-white/80 hover:text-white p-3 shadow-md hover:shadow-xl rounded-lg bg-white/30"
						href="https://wa.me/+233557918347"
						target="_blank"
						rel="noopener noreferrer">
						<BsWhatsapp className="shrink-0 text-xl" />
						+233557918347
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
