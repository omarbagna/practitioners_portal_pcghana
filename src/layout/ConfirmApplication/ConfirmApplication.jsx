import { Typography } from '@material-tailwind/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { BiArrowBack } from 'react-icons/bi';
import { ButtonComponent } from '../../components';
//import { useDataContext } from '../../context/DataContext';
import { useStateContext } from '../../context/StateContext';
//import SkeletonLoad from '../LoadingScreen/SkeletonLoad';

const InvoiceModal = () => {
	const navigate = useNavigate();
	const { submissionSuccess, setSubmissionSuccess, setShowInvoice } =
		useStateContext();

	return (
		<AnimatePresence mode="wait">
			{submissionSuccess && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					onClick={() => setSubmissionSuccess(false)}
					exit={{ opacity: 0 }}
					className="fixed z-40 flex flex-col gap-3 justify-center items-center top-0 left-0 w-full overflow-hidden h-full bg-black/90 backdrop-blur-md">
					<div className="fixed right-3 bottom-2 md:right-6 md:bottom-10">
						<ButtonComponent
							color="red"
							onClick={() => setSubmissionSuccess(false)}
							width
							type="button"
							title="close"
						/>
					</div>

					<motion.div
						onClick={(e) => e.stopPropagation()}
						initial={{ y: -200 }}
						animate={{ y: 0 }}
						exit={{ y: -200 }}
						transition={{ duration: 0.5, type: 'tween' }}
						//style={{ color: currentColor.code }}
						className="w-fit h-full flex flex-col gap-5 justify-center items-center mt-24 px-5">
						<div className="w-fit h-fit flex flex-col gap-5 justify-center items-center text-white bg-gradient-to-b from-green-500 to-green-800  rounded-2xl p-3  lg:py-10 lg:px-5">
							<Typography
								variant="paragraph"
								className="font-medium text-xl text-center capitalize">
								<strong>Application submitted successfully</strong>
							</Typography>
							<Typography
								variant="paragraph"
								className="font-normal text-xl text-center capitalize">
								Click the button below to download your invoice
							</Typography>
							<ButtonComponent
								color="blue"
								width
								type="button"
								onClick={() => {
									setShowInvoice(true);
									setSubmissionSuccess(false);
									navigate('/');
								}}
								title="view invoice"
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default InvoiceModal;
