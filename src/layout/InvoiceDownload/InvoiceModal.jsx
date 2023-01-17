import { Typography } from '@material-tailwind/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
//import { BiArrowBack } from 'react-icons/bi';
import { ButtonComponent } from '../../components';
import { useDataContext } from '../../context/DataContext';
import { useStateContext } from '../../context/StateContext';
import SkeletonLoad from '../LoadingScreen/SkeletonLoad';

const InvoiceModal = () => {
	const { showInvoice, setShowInvoice, loadingInvoice } = useStateContext();
	const { invoiceData } = useDataContext();

	return (
		<AnimatePresence mode="wait">
			{showInvoice && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					onClick={() => setShowInvoice(false)}
					exit={{ opacity: 0 }}
					className="fixed z-40 flex flex-col gap-3 justify-center items-center top-0 left-0 w-full overflow-hidden h-full bg-black/90 backdrop-blur-md">
					<div className="fixed right-3 bottom-2 md:right-6 md:bottom-10">
						<ButtonComponent
							color="red"
							onClick={() => setShowInvoice(false)}
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
						<Typography
							variant="h4"
							color="white"
							className="font-medium text-3xl text-center capitalize">
							Generated Invoices
						</Typography>

						{!loadingInvoice ? (
							<div className="w-fit h-3/4 flex flex-col gap-5 justify-center items-center overflow-auto pt-20">
								{invoiceData !== null ? (
									invoiceData?.map(
										({ service, invoice_url, invoice_no, invoice_doc_url }) => (
											<div
												key={invoice_no}
												className="w-[25rem] h-fit flex flex-col gap-5 justify-center items-center text-white bg-gradient-to-b from-blue-600 to-[#0404FF]  rounded-2xl p-3  lg:py-10 lg:px-5">
												<Typography
													variant="paragraph"
													className="font-medium text-xl text-center capitalize">
													<strong>{service}</strong>
												</Typography>

												<div className="flex gap-2 justify-center items-end">
													<Typography
														variant="paragraph"
														className="font-ligt text-base text-center capitalize">
														invoice number: {invoice_no}
													</Typography>
												</div>

												<a
													href={invoice_url || invoice_doc_url}
													target="_blank"
													className="w-full"
													rel="noopener noreferrer">
													<ButtonComponent
														color="green"
														width
														type="button"
														title="download invoice"
													/>
												</a>
											</div>
										)
									)
								) : (
									<div className="w-fit h-fit flex flex-col gap-5 justify-center items-center text-white bg-gradient-to-b from-blue-600 to-[#0404FF]  rounded-2xl p-3  lg:py-10 lg:px-5">
										<Typography
											variant="paragraph"
											className="font-medium text-xl text-center capitalize">
											<strong>nothing to see here</strong>
										</Typography>
									</div>
								)}
							</div>
						) : (
							<div className="w-full h-1/2 bg-gradient-to-b from-[#0404FF] to-blue-600 rounded-xl shadow-blue-400/30 shadow-lg flex justify-center items-center">
								<SkeletonLoad />
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default InvoiceModal;
