import { Typography } from '@material-tailwind/react';
import React from 'react'; //, { useState }
import { MdWorkOutline } from 'react-icons/md';
//import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
import ButtonComponent from '../Button/Button';
import { Link } from 'react-router-dom';

const CPDWidget = ({ cpdDATA, year }) => {
	return (
		<div className="group relative transition-all duration-150 ease-in rounded-lg w-full h-72 p-4 bg-blue-600 shadow-blue-500/50 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl overflow-hidden">
			{/* Render component inactive 
			<div className="absolute top-0 left-0 z-30 w-full h-full bg-gray-800/70 backdrop-blur-sm cursor-not-allowed" />
*/}
			<div className="transition-all duration-150 ease-in absolute z-10 -top-10 -right-20 text-[16rem] text-white/30 group-hover:scale-105">
				<MdWorkOutline />
			</div>

			<div className="relative z-20 w-full h-full flex flex-col justify-between items-center">
				<div className="w-full flex flex-col gap-3 justify-center items-center">
					<Typography
						variant="h2"
						color="white"
						className="capitalize text-left text-2xl w-full">
						Continuous Professional Development
					</Typography>
					<Typography
						variant="paragraph"
						className="font-light text-center text-base text-gray-800 bg-white/70 w-full rounded-md p-2">
						CPD Score {year} : {cpdDATA?.score}/{cpdDATA?.overall_cutoff}
						<br />
						Category 1: {cpdDATA?.category_scores[0]?.score}/
						{cpdDATA?.category_scores[0]?.cutoff}
						<br />
						Category 2: {cpdDATA?.category_scores[1]?.score}/
						{cpdDATA?.category_scores[1]?.cutoff}
						<br />
						Category 3: {cpdDATA?.category_scores[2]?.score}/
						{cpdDATA?.category_scores[2]?.cutoff}
					</Typography>
				</div>

				<div className="w-full flex justify-center items-center gap-5">
					<Link to="/" className="w-full">
						<ButtonComponent width title="go to cpd" color="cyan" />
					</Link>
				</div>

				{/*<div className="w-full flex justify-end items-center gap-2">
					{isGood ? (
						<>
							<Typography
								variant="paragraph"
								className="capitalize text-sm text-right text-gray-200">
								you're in good standing
							</Typography>
							<BsPatchCheckFill className="text-2xl text-green-400" />
						</>
					) : (
						<>
							<Typography
								variant="paragraph"
								className="capitalize text-sm text-right text-gray-200">
								you're not in good standing
							</Typography>
							<BsPatchExclamationFill className="text-2xl text-red-400" />
						</>
					)}
					</div>*/}
			</div>
		</div>
	);
};

export default CPDWidget;
