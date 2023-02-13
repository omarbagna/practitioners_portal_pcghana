import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { ButtonComponent } from '../../components';
import { useDataContext } from '../../context/DataContext';
import { useStateContext } from '../../context/StateContext';
import SkeletonLoad from '../LoadingScreen/SkeletonLoad';

const InvoiceModal = () => {
	const { showInvoice, setShowInvoice, loadingInvoice } = useStateContext();
	const { invoiceData, image, onImageChange, removeImage } = useDataContext();
	const [switchingSides, setSwitchingSides] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoadingPayOnline, setIsLoadingPayOnline] = useState(false);
	const [uploadReceipt, setUploadReceipt] = useState(false);
	const [uploadReceiptDetails, setUploadReceiptDetails] = useState({
		service: '',
		invoice_no: '',
	});

	const openReceiptUpload = (invoiceNumber, service) => {
		setSwitchingSides(true);
		setUploadReceipt(true);
		setUploadReceiptDetails({ service: service, invoice_no: invoiceNumber });
		setSwitchingSides(false);
	};

	const closeReceiptUpload = () => {
		setSwitchingSides(true);
		setUploadReceipt(false);
		removeImage();
		setSwitchingSides(false);
	};

	const handleUpload = async (event) => {
		let uploadData;
		let base64Image = image.replace('data:image/jpeg;base64,', '');
		event.preventDefault();

		uploadData = {
			method: 'CONFIRM_PAYMENT_FOR_PORTAL_INVOICE',
			api_key: '5f25016eff01da8246b9bf0cb7de33ae3da8246b78',
			invoice_number: uploadReceiptDetails?.invoice_no,
			receipt_photo_string: base64Image,
		};

		if (image === null) {
			toast.error('Please add an image before submitting');
		} else {
			try {
				const privateResponse = await axios.post(
					'https://goldenministersfellowship.org/pcghana-api/',
					JSON.stringify(uploadData),
					{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true,
					}
				);
				let responseData = privateResponse.data;
				console.log(responseData);

				if (responseData?.resp_code === '000') {
					toast.success('Receipt Upload successful');

					setIsSubmitting(false);
				} else {
					console.log(privateResponse?.data?.resp_msg);
					toast.error(privateResponse?.data?.resp_msg);
					setIsSubmitting(false);
				}
			} catch (error) {
				let errorMessage;
				if (error.response?.status === 400) {
					errorMessage = 'Server Error';
					console.log(errorMessage);
					setIsSubmitting(false);
				}
			}

			setIsSubmitting(false);
			closeReceiptUpload();
		}
	};

	const payOnline = async (event, ivoice_number) => {
		setIsLoadingPayOnline(true);
		let requestOnlinePayment;
		event.preventDefault();

		requestOnlinePayment = {
			method: 'REQUEST_INVOICE_PAYMENT',
			api_key: '5f25016eff01da8246b9bf0cb7de33ae3da8246b78',
			invoice_number: ivoice_number,
		};

		try {
			const privateResponse = await axios.post(
				'https://goldenministersfellowship.org/pcghana-api/',
				JSON.stringify(requestOnlinePayment),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			let responseData = privateResponse.data;
			console.log(responseData);

			if (responseData?.resp_code === '000') {
				toast.success('Redirecting ...');

				setIsLoadingPayOnline(false);
				window.open(responseData?.redirect_url, '_blank');
			} else {
				console.log(privateResponse?.data?.resp_msg);
				toast.error(privateResponse?.data?.resp_msg);
				setIsLoadingPayOnline(false);
			}
		} catch (error) {
			let errorMessage;
			if (error.response?.status === 400) {
				errorMessage = 'Server Error';
				console.log(errorMessage);
				setIsLoadingPayOnline(false);
			}
		}
	};

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
						className="w-full h-full px-5">
						{!uploadReceipt ? (
							<div className="w-full h-full flex flex-col gap-5 justify-center items-center">
								<Typography
									variant="h4"
									color="white"
									className="font-medium text-3xl text-center capitalize">
									Generated Invoices
								</Typography>
								{!loadingInvoice && !isLoadingPayOnline ? (
									<div className="w-fit h-fit flex flex-wrap gap-3 justify-center items-center overflow-y-auto p-10">
										{invoiceData !== null ? (
											invoiceData?.map(
												({
													service,
													invoice_url,
													invoice_no,
													invoice_doc_url,
													invoice_type,
													payment_status,
												}) => (
													<div
														key={invoice_no}
														className="relative w-[25rem] h-fit mr-4 flex flex-col gap-5 justify-center items-center text-white bg-gradient-to-b from-blue-600 to-[#0404FF]  rounded-2xl p-3  lg:py-10 lg:px-5">
														<div
															className={`absolute top-2 right-3 uppercase w-fit rounded-md p-1 text-xs text-white font-medium ${
																payment_status === 'paid'
																	? 'bg-green-500/70'
																	: 'bg-red-400/70'
															}`}>
															{payment_status === 'paid' ? 'paid' : 'unpaid'}
														</div>

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

														<div className="w-full flex justify-center items-center gap-3">
															{invoice_type === 'EP' ? (
																<ButtonComponent
																	color="teal"
																	width
																	type="button"
																	title="pay online"
																	onClick={(e) => payOnline(e, invoice_no)}
																/>
															) : payment_status === 'paid' ? null : null}

															<ButtonComponent
																color="purple"
																width
																type="button"
																title="confirm payment"
																onClick={() =>
																	openReceiptUpload(invoice_no, service)
																}
															/>
														</div>
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

												{/**

												<div className="relative w-[25rem] h-fit mr-4 flex flex-col gap-5 justify-center items-center text-white bg-gradient-to-b from-blue-600 to-[#0404FF]  rounded-2xl p-3  lg:py-10 lg:px-5">
													<div
														className={`absolute top-2 right-3 uppercase w-fit rounded-md p-1 text-xs text-white font-medium ${'bg-red-400/70'}`}>
														unpaid
													</div>

													<Typography
														variant="paragraph"
														className="font-medium text-xl text-center capitalize">
														<strong>service</strong>
													</Typography>

													<div className="flex gap-2 justify-center items-end">
														<Typography
															variant="paragraph"
															className="font-ligt text-base text-center capitalize">
															invoice number: invoice_no
														</Typography>
													</div>

													<a
														href="https://google.com"
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

													<div className="w-full flex justify-center items-center gap-3">
														<ButtonComponent
															color="teal"
															width
															type="button"
															title="pay online"
															onClick={(e) => payOnline(e, 'invoice_no')}
														/>

														<ButtonComponent
															color="purple"
															width
															type="button"
															title="confirm payment"
															onClick={() =>
																openReceiptUpload('invoice_no', 'service')
															}
														/>
													</div>
												</div>
												 */}
											</div>
										)}
									</div>
								) : (
									<div className="w-full h-1/2 bg-gradient-to-b from-[#0404FF] to-blue-600 rounded-xl shadow-blue-400/30 shadow-lg flex justify-center items-center">
										<SkeletonLoad />
									</div>
								)}
							</div>
						) : (
							<>
								{!switchingSides || !isSubmitting ? (
									<div className="w-full h-full flex flex-col gap-5 justify-center items-center">
										<form
											onSubmit={handleUpload}
											className="flex flex-col gap-5 justify-center items-center w-full h-full px-8">
											<div className="flex justify-between items-center w-full">
												<input
													type="file"
													accept="image/*"
													name="uploaded_receipt"
													onChange={onImageChange}
													id="upload-photo"
													className="hidden"
												/>
											</div>

											<div className="w-full flex flex-col lg:flex-row justify-between items-center gap-5">
												<div className="w-fit p-4 flex flex-col gap-2 rounded-md bg-gradient-to-b from-[#0404FF] to-blue-600">
													<Typography
														variant="h5"
														color="white"
														className="font-medium text-xl text-center lg:text-left capitalize">
														Upload Receipt for invoice number{' '}
														<em>{uploadReceiptDetails?.invoice_no} </em>
													</Typography>
													<Typography
														variant="h5"
														color="white"
														className="font-medium text-2xl text-center lg:text-left capitalize">
														{uploadReceiptDetails?.service}
													</Typography>
												</div>
												<div className="w-fit flex justify-center items-center gap-3">
													<ButtonComponent
														reset
														title="cancel"
														onClick={closeReceiptUpload}
													/>
													<ButtonComponent type="submit" title="submit" />
												</div>
											</div>

											<div className="flex flex-wrap p-6 gap-3 justify-start items-center rounded-md w-full h-1/2 border-2 border-gray border-dashed">
												{image === null ? (
													<label
														htmlFor="upload-photo"
														className="h-32 w-full capitalize text-lg md:text-xl text-center text-accent cursor-pointer flex flex-col justify-center items-center text-white">
														<BiImageAdd className="text-4xl md:text-6xl" />
														Upload a photo of your receipt
													</label>
												) : (
													<div className="relative overflow-hidden w-full h-full">
														<div
															onClick={() => removeImage()}
															className="group absolute top-0 right-0 flex justify-center items-center transition-all duration-150 ease-in rounded-r-md w-5 lg:w-8  md:hover:w-10 h-full bg-red-400 hover:shadow-lg hover:shadow-red-400/50 hover:bg-red-500 cursor-pointer">
															<Typography
																variant="h4"
																color="white"
																className="transition-all duration-150 ease-in tracking-widest group-hover:tracking-normal text-center text-base md:text-lg uppercase rotate-90">
																remove
															</Typography>
														</div>

														<img
															src={image}
															className="object-cover object-top h-full w-full rounded-md shadow-sm cursor-pointer"
															alt="uploaded receipt"
														/>
													</div>
												)}
											</div>
										</form>
									</div>
								) : (
									<div className="w-full h-1/2 bg-gradient-to-b from-[#0404FF] to-blue-600 rounded-xl shadow-blue-400/30 shadow-lg flex justify-center items-center">
										<SkeletonLoad />
									</div>
								)}
							</>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default InvoiceModal;
