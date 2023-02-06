import {
	Checkbox,
	Dialog,
	DialogFooter,
	DialogHeader,
	Typography,
} from '@material-tailwind/react';
import {
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
//import { axiosPrivate } from '../../api/axios';
import axios from 'axios';
import {
	ButtonComponent,
	DefaultInput,
	FormQuestion,
	FormSection,
	FormTitle,
	SelectInput,
} from '../../components';
import { useAuthContext } from '../../context/AuthContext';
import { useDataContext } from '../../context/DataContext';
import { ConfirmApplication, SkeletonLoad } from '../../layout';
import { epharmacyFormNoticePoints } from './data';
import { useStateContext } from '../../context/StateContext';
import { axiosPrivate } from '../../api/axios';

const EPharmacyForm = () => {
	const { user } = useAuthContext();
	const {
		pharmacyRenewalData,
		//, invoiceData, setInvoiceData
	} = useDataContext();
	const { setSubmissionSuccess } = useStateContext();
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate();

	const { handleSubmit, control, watch, reset, setValue } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			pharmacy_name:
				pharmacyRenewalData?.pharmacy_name === null
					? '--'
					: pharmacyRenewalData?.pharmacy_name,
			license_number:
				pharmacyRenewalData?.license_number === null
					? '--'
					: pharmacyRenewalData?.license_number,
			business_type:
				pharmacyRenewalData?.business_type === null
					? '--'
					: pharmacyRenewalData?.business_type,
			region:
				pharmacyRenewalData?.region === null
					? '--'
					: pharmacyRenewalData?.region,
			district:
				pharmacyRenewalData?.district === null
					? '--'
					: pharmacyRenewalData?.district,
			town:
				pharmacyRenewalData?.town === null ? '--' : pharmacyRenewalData?.town,
			street:
				pharmacyRenewalData?.street === null
					? '--'
					: pharmacyRenewalData?.street,
			location:
				pharmacyRenewalData?.location === null
					? '--'
					: pharmacyRenewalData?.location,
			gps_address:
				pharmacyRenewalData?.gps_address === null
					? '--'
					: pharmacyRenewalData?.gps_address,
			phone_number:
				pharmacyRenewalData?.phone_number === null
					? '--'
					: pharmacyRenewalData?.phone_number,
			pharmacy_email:
				pharmacyRenewalData?.pharmacy_email === null
					? '--'
					: pharmacyRenewalData?.pharmacy_email,

			pos_nature_of_use: null,

			pharmacist_registration_number: '',
			data_protection_certificate: '',

			delivery_service: {
				services_offered: null,
				services_provider: null,
			},

			facility_readiness: {
				bank_card_accepted: null,
				desk_computer: null,
				feature_phone: null,
				internet_access_available: null,
				mobile_money_accepted: null,
				phone_number_for_enquiries_and_orders: null,
				pos_available: null,
				presence_on_other_web_pages: null,
				smartphone: null,
				social_media_presence: null,
				standby_power_available: null,
				tablet: null,
				website: null,
			},

			payment_processing_gateway: {
				bank_debit_card: false,
				cash: false,
				cheque: false,
				mobile_money: false,
				nhis: false,
				private_insurance: false,
			},

			pharmaceutical_services: {
				in_person: false,
				phone_call: false,
				text_sms_email_whatsapp: false,
				website: false,
			},

			pos_system_usage: {
				crm: null,
				employee_management: null,
				inventory_management: null,
				payment_processing: null,
				sales_reporting: null,
				transaction_management: null,
			},

			pos_system_vendor_relationship: {
				internet_dependent: null,
				internet_not_required: null,
				vendor_name: '',
				vendor_provides_support: null,
				vendor_relationship: null,
			},

			prescriptions_processed: {
				e_prescription_submitted_digitally: false,
				physician_request_text_sms_whatsapp_email: false,
				physician_request_voice_call: false,
				written_submitted_digitally: false,
				written_submitted_in_person: false,
			},

			purchase_process: {
				email: false,
				in_person_check: false,
				phone_call: false,
				text_sms: false,
				website: false,
				whatsapp: false,
			},

			technical_proficiency: {
				attendants_understanding_of_technologies: null,
				employees_can_use_payment_processing_system: null,
				employees_can_use_pos_system: null,
				pharmacist_understanding_of_technologies: null,
			},

			terms_and_conditions_agreement: false,
		},
	});

	console.log(watch());

	useEffect(() => {
		if (pharmacyRenewalData === null) {
			toast.error(
				'You cannot access this page. Fill pharmacy renewal form before attempting to access page.'
			);
			navigate('/', { replace: true });
		}

		console.log(pharmacyRenewalData);
	}, [pharmacyRenewalData, navigate]);

	//console.log(relicensureData);
	const formData = new FormData();
	const epharmacyFormData = new FormData();

	const handleFormSubmit = async (data) => {
		let finalFormData = {};

		finalFormData = {
			...pharmacyRenewalData,
			epharmacy_data: data,
		};

		//console.log({ finalFormData });

		formData.append('license_number', finalFormData?.license_number);
		formData.append('reg_num', user?.registration_number);
		formData.append('weekdays_start_time', finalFormData?.weekdays_start_time);
		formData.append('weekdays_end_time', finalFormData?.weekdays_end_time);
		formData.append('weekend_start_time', finalFormData?.weekend_start_time);
		formData.append('weekend_end_time', finalFormData?.weekend_end_time);
		formData.append('support_staff', finalFormData?.support_staff);
		formData.append('phone', finalFormData?.phone_number);
		formData.append('email', finalFormData?.pharmacy_email);
		formData.append('gps', finalFormData?.gps_address);
		formData.append('epharmacy_data', finalFormData?.epharmacy_data);

		epharmacyFormData.append('license_number', finalFormData?.license_number);
		epharmacyFormData.append('reg_num', finalFormData?.registration_number);
		epharmacyFormData.append(
			'readiness_assessment',
			finalFormData?.epharmacy_data
		);
		console.log({ finalFormData });

		setIsSubmitting(true);

		/**

		try {
			const privateResponse = await axios.post(
				'https://goldenministersfellowship.org/pcghana-api/',
				JSON.stringify({
					method: 'SAVE_RENEWAL_DATA',
					api_key: '42353d5c33b45b0a8246b9bf0cd46820e516e3e4',
					...finalFormData,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
					//withCredentials: true,
				}
			);

			//console.log(privateResponse);

			if (privateResponse.data?.resp_code === '000') {
				try {
					const response = await axiosPrivate.post(
						'api/saverenewal',
						formData,
						{
							headers: {
								Token: user?.token,
								Userid: user?.id,
								Type: user?.type,
								'Content-Type': 'multipart/form-data',
							},
						}
					);

					if (response?.data?.status === '0') {
						//setIsSubmitting(false);
						console.log('Application submission failed (pc part)');
					} else if (response?.data?.status === '-1') {
						//setIsSubmitting(false);
						//console.log(response?.data);
						console.log(response?.data?.message);
					} else if (response?.data?.status === '1') {
						console.log('Initial submission successful (pc part)');

						//setIsSubmitting(false);
						//toast.success('Application Submitted Successful pc part');

						//Navigate('/', { replace: true });
					}
				} catch (err) {
					let errMessage;
					if (err.response?.status === 400) {
						errMessage = 'Server Error';
						console.log(errMessage);
					}
				}

				try {
					const secondResponse = await axiosPrivate.post(
						'api_pharmacy/saveEpharmacyRegistration',
						epharmacyFormData,
						{
							headers: {
								Token: user?.token,
								Userid: user?.id,
								Type: user?.type,
								'Content-Type': 'multipart/form-data',
							},
						}
					);

					if (secondResponse?.data?.status === '0') {
						//setIsSubmitting(false);
						console.log('Application submission failed (pc part epharmacy)');
					} else if (secondResponse?.data?.status === '-1') {
						//setIsSubmitting(false);
						//console.log(secondResponse?.data);
						console.log(secondResponse?.data?.message);
					} else if (secondResponse?.data?.status === '1') {
						console.log('Initial submission successful (pc part epharmacy)');

						//setIsSubmitting(false);
						//toast.success('Application Submitted Successful pc part');

						//Navigate('/', { replace: true });
					}
				} catch (err) {
					let errMessage;
					if (err.response?.status === 400) {
						errMessage = 'Server Error';
						console.log(errMessage);
					}
				}

				toast.success('Application Submitted Successful');
				/*if (invoiceData === null) {
					setInvoiceData(privateResponse.data?.invoices);
				} else {
					setInvoiceData([...invoiceData, ...privateResponse.data?.invoices]);
				} 
				setIsSubmitting(false);
				setSubmissionSuccess(true);
				//navigate('/', { replace: true });
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
			}
		}

		setIsSubmitting(false);

 */

		try {
			const response = await axiosPrivate.post('api/saverenewal', formData, {
				headers: {
					Token: user?.token,
					Userid: user?.id,
					Type: user?.type,
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response?.data?.status === '0') {
				setIsSubmitting(false);
				toast.error('Application submission failed');
			} else if (response?.data?.status === '-1') {
				setIsSubmitting(false);
				console.log(response?.data);
				toast.error(response?.data?.message);
			} else if (response?.data?.status === '1') {
				console.log('Initial submission successful');
				try {
					const secondResponse = await axiosPrivate.post(
						'api_pharmacy/saveEpharmacyRegistration',
						epharmacyFormData,
						{
							headers: {
								Token: user?.token,
								Userid: user?.id,
								Type: user?.type,
								'Content-Type': 'multipart/form-data',
							},
						}
					);

					if (secondResponse?.data?.status === '0') {
						//setIsSubmitting(false);
						console.log('Application submission failed (pc part epharmacy)');
					} else if (secondResponse?.data?.status === '-1') {
						//setIsSubmitting(false);
						//console.log(secondResponse?.data);
						console.log(secondResponse?.data?.message);
					} else if (secondResponse?.data?.status === '1') {
						console.log('Initial submission successful (pc part epharmacy)');

						//setIsSubmitting(false);
						//toast.success('Application Submitted Successful pc part');

						//navigate('/', { replace: true });
					}
				} catch (err) {
					let errMessage;
					if (err.response?.status === 400) {
						errMessage = 'Server Error';
						console.log(errMessage);
					}
				}

				try {
					const privateResponse = await axios.post(
						'https://goldenministersfellowship.org/pcghana-api/',
						JSON.stringify({
							method: 'SAVE_RENEWAL_DATA',
							api_key: '42353d5c33b45b0a8246b9bf0cd46820e516e3e4',
							...finalFormData,
						}),
						{
							headers: { 'Content-Type': 'application/json' },
							//withCredentials: true,
						}
					);

					//console.log(privateResponse);

					if (privateResponse.data?.resp_code === '000') {
						//toast.success('Application Submitted Successful');
						/*if (invoiceData === null) {
							setInvoiceData(privateResponse.data?.invoices);
						} else {
							setInvoiceData([...invoiceData, ...privateResponse.data?.invoices]);
						} */
						toast.success('Application Submitted Successfully');
						setIsSubmitting(false);
						setSubmissionSuccess(true);
						//navigate('/', { replace: true });

						return;
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
					}
				}

				setIsSubmitting(false);

				//navigate('/', { replace: true });
			}
		} catch (err) {
			let errMessage;
			if (err.response?.status === 400) {
				errMessage = 'Server Error';
				console.log(errMessage);
			}

			setIsSubmitting(false);
		}
	};

	const handleOpen = () => setOpen(!open);
	const handleReset = () => {
		reset();
		navigate('/pharmacy-renewal-application');
	};

	return (
		<>
			<div className="w-full h-full flex flex-col justify-start items-center gap-10 mt-10">
				<FormTitle title="Pharmacy Renewal Application continued" />
				{isSubmitting ? (
					<div className="w-full h-full bg-gradient-to-b from-[#0404FF] to-blue-600 rounded-xl shadow-blue-400/30 shadow-lg flex justify-center items-center">
						<SkeletonLoad />
					</div>
				) : (
					<div className="w-full h-full flex flex-col justify-start items-center gap-10 mt-10">
						<div className="w-full bg-red-300/50 gap-5 text-red-600 rounded-lg p-3 flex flex-col justify-center items-start">
							<div className="w-full flex justify-start items-start gap-3">
								<div className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-2" />
								<Typography>
									Note that for pharmacies with multiple branches, each
									application applies to only one branch. Thus multiple
									applications are required for each branch.
								</Typography>
							</div>
							<div className="w-full flex justify-start items-start gap-3">
								<div className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-2" />
								<Typography>
									Please ensure you have entered a valid email address. The link
									to upload the bank pay-in slip will be sent to the email
									provided
								</Typography>
							</div>

							<div className="w-full flex justify-start items-start gap-3">
								<div className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-2" />
								<Typography>
									After this application, your specified superintendent
									Pharmacist will be required to give confirmation through the
									Pharmacists' Portal before payment can be made and the
									application processed
								</Typography>
							</div>
						</div>

						<form
							onSubmit={handleSubmit(handleFormSubmit)}
							className="w-full h-full flex flex-col justify-start items-center gap-8 mt-6">
							<FormSection sectionName="facility data">
								<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
									<div className="col-span-3 lg:col-span-4 w-full">
										<Controller
											control={control}
											name="pharmacy_name"
											/*rules={{
											required: 'Please enter license number to Login',
										}} */
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="pharmacy_name"
													label="Name of Pharmacy"
													type="text"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-4 w-full">
										<Controller
											control={control}
											name="license_number"
											/*rules={{
											required: 'Please enter license number to Login',
										}} */
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="license_number"
													label="License Number"
													type="text"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-4 w-full">
										<Controller
											control={control}
											name="business_type"
											/*rules={{
											required: 'Please enter license number to Login',
										}} */
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="business_type"
													label="Business Type"
													type="text"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-4 w-full">
										<Controller
											control={control}
											name="region"
											/*rules={{
											required: 'Please enter license number to Login',
										}} */
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="region"
													label="Region"
													type="text"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-4 w-full">
										<Controller
											control={control}
											name="district"
											/*rules={{
											required: 'Please enter license number to Login',
										}} */
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="district"
													label="District"
													type="text"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-4 w-full">
										<Controller
											control={control}
											name="town"
											/*rules={{
											required: 'Please enter license number to Login',
										}} */
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="town"
													label="Town"
													type="text"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-6 w-full">
										<Controller
											control={control}
											name="street"
											/*rules={{
											required: 'Please enter license number to Login',
										}} */
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="street"
													label="Street"
													type="text"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-6 w-full">
										<Controller
											control={control}
											name="location"
											/*rules={{
											required: 'Please enter license number to Login',
										}} */
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="location"
													label="Location Hse / No"
													type="text"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-6 lg:col-span-4 w-full">
										<Controller
											control={control}
											name="gps_address"
											/*rules={{
											required: 'Please enter license number to Login',
										}} */
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="gps_address"
													label="Ghana Post Digital Address"
													type="text"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-4 w-full">
										<Controller
											control={control}
											name="phone_number"
											rules={{
												pattern: {
													value: /^(0|233|\+233)[\d]{9}$/gi,
													message: 'Please enter a valid Phone Number',
												},
											}}
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="phone_number"
													label="Phone Number"
													type="tel"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-4 w-full">
										<Controller
											control={control}
											name="pharmacy_email"
											rules={{
												pattern: {
													value:
														/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
													message: 'Please enter a valid email address',
												},
												required: 'Please enter email address',
											}}
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="pharmacy_email"
													label="Pharmacy Email"
													type="email"
													disabled
													labelProps={{ style: { color: '#000' } }}
													required
												/>
											)}
										/>
									</div>
									<div className="col-span-3 lg:col-span-8 w-full flex flex-col md:flex-row justify-center items-center gap-3">
										<div className="w-full md:w-3/4">
											<Controller
												control={control}
												name="pharmacist_registration_number"
												render={({
													field: { ref, ...field },
													fieldState: { error, invalid },
												}) => (
													<DefaultInput
														{...field}
														ref={ref}
														error={invalid}
														helpertext={invalid ? error.message : null}
														name="pharmacist_registration_number"
														label="Registration Number of Pharmacist-In-Charge"
														type="text"
													/>
												)}
											/>
										</div>

										<div className="w-full md:w-1/4">
											<ButtonComponent width type="button" title="search" />
										</div>
									</div>

									<div className="col-span-3 lg:col-span-4 w-full flex flex-col justify-center items-start gap-3">
										<Controller
											control={control}
											name="data_protection_certificate"
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<DefaultInput
													{...field}
													ref={ref}
													error={invalid}
													helpertext={invalid ? error.message : null}
													name="data_protection_certificate"
													label="Data Protection Certificate (if available)"
													type="file"
													accept="application/pdf"
												/>
											)}
										/>
										<Typography
											variant="paragraph"
											className="font-medium text-sm text-[#8C8CFF] tracking-tight">
											<strong>NB:</strong>{' '}
											<em>
												If available. This is not required for the initial
												registration, but will be required for subsequent
												renewal of the license
											</em>
										</Typography>
									</div>
								</div>
							</FormSection>

							<FormSection sectionName="digitisation readiness assessment">
								<div className="w-full h-full flex flex-col justify-end items-center gap-10">
									<div className="w-full flex flex-col justify-center items-center gap-6">
										<FormQuestion
											questionNumber="1"
											question="Facility readiness"
											instruction="(please select a option from the list of options for each field)"
										/>

										<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
											<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
												<Controller
													control={control}
													name="facility_readiness.desk_computer"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.desk_computer"
															label="Desk Computer"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
												<Controller
													control={control}
													name="facility_readiness.tablet"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.tablet"
															label="Tablet"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
												<Controller
													control={control}
													name="facility_readiness.smartphone"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.smartphone"
															label="Smartphone"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
												<Controller
													control={control}
													name="facility_readiness.feature_phone"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.feature_phone"
															label="Feature Phone"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
												<Controller
													control={control}
													name="facility_readiness.website"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.website"
															label="Website"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
												<Controller
													control={control}
													name="facility_readiness.social_media_presence"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.social_media_presence"
															label="Social Media Presence"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-3 lg:col-span-6 xl:col-span-6 w-full">
												<Controller
													control={control}
													name="facility_readiness.phone_number_for_enquiries_and_orders"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.phone_number_for_enquiries_and_orders"
															label="Mobile/Phone Number for Enquiries and Orders"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-3 lg:col-span-6 xl:col-span-6 w-full">
												<Controller
													control={control}
													name="facility_readiness.presence_on_other_web_pages"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.presence_on_other_web_pages"
															label="Presence on Other Web Pages (e.g directories)"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>

											<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
												<Controller
													control={control}
													name="facility_readiness.mobile_money_accepted"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.mobile_money_accepted"
															label="Mobile Money Accepted"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
												<Controller
													control={control}
													name="facility_readiness.bank_card_accepted"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.bank_card_accepted"
															label="Bank Card Payment Accepted"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
												<Controller
													control={control}
													name="facility_readiness.internet_access_available"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.internet_access_available"
															label="Internet Access Available"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-6 lg:col-span-12 xl:col-span-5 w-full">
												<Controller
													control={control}
													name="facility_readiness.pos_available"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.pos_available"
															label="Special Transactions Software – POS/Sales Software"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-6 lg:col-span-12 xl:col-span-4 w-full">
												<Controller
													control={control}
													name="facility_readiness.standby_power_available"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="facility_readiness.standby_power_available"
															label="Standby Power Source (e.g Generator) available"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
										</div>
									</div>

									<div className="w-full flex flex-col justify-center items-center gap-6">
										<FormQuestion
											questionNumber="2"
											question="Technical Proficiency of Human Personnel"
											instruction="(please select a option from the list of options for each field)"
										/>

										<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
											<div className="col-span-6 lg:col-span-12 xl:col-span-6 w-full">
												<Controller
													control={control}
													name="technical_proficiency.pharmacist_understanding_of_technologies"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="technical_proficiency.pharmacist_understanding_of_technologies"
															label="General Understanding/Proficiency in digital technologies (Pharmacist)"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-6 lg:col-span-12 xl:col-span-6 w-full">
												<Controller
													control={control}
													name="technical_proficiency.attendants_understanding_of_technologies"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="technical_proficiency.attendants_understanding_of_technologies"
															label="General Understanding/Proficiency in digital technologies (Attendants)"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-6 lg:col-span-12 xl:col-span-6 w-full">
												<Controller
													control={control}
													name="technical_proficiency.employees_can_use_payment_processing_system"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="technical_proficiency.employees_can_use_payment_processing_system"
															rules={{
																required: 'Please select an option',
															}}
															label="Employees who can use Payment Processing System"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-6 lg:col-span-12 xl:col-span-6 w-full">
												<Controller
													control={control}
													name="technical_proficiency.employees_can_use_pos_system"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="technical_proficiency.employees_can_use_pos_system"
															rules={{
																required: 'Please select an option',
															}}
															label="Employees who can use Point of Sale System"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
										</div>
									</div>
								</div>
							</FormSection>

							<FormSection sectionName="Pharmacy Practices">
								<div className="w-full h-full flex flex-col justify-end items-center gap-10">
									<div className="w-full flex flex-col justify-center items-center gap-6">
										<FormQuestion
											questionNumber="3"
											question="Purchase Process Used"
											instruction="(please select multiple options if applicable)"
										/>
										<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
											<div className="col-span-6 lg:col-span-12 w-full">
												<Controller
													control={control}
													name="purchase_process"
													rules={{
														validate: (value) =>
															Object.values(value).includes(true) ||
															'Please select at least one option',
													}}
													render={({
														field: { ref, onChange, ...field },
														fieldState: { error, invalid },
													}) => (
														<FormControl
															{...field}
															ref={ref}
															required
															error={invalid}
															className="w-full"
															component="fieldset">
															<FormGroup>
																<Grid container spacing={2} columns={12}>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="purchase_process.in_person_check"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'purchase_process.in_person_check'
																								)}
																								name="purchase_process.in_person_check"
																							/>
																						}
																						label="In-Person"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="purchase_process.phone_call"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'purchase_process.phone_call'
																								)}
																								name="purchase_process.phone_call"
																							/>
																						}
																						label="Phone /Voice Call"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="purchase_process.website"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'purchase_process.website'
																								)}
																								name="purchase_process.website"
																							/>
																						}
																						label="Website"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="purchase_process.whatsapp"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'purchase_process.whatsapp'
																								)}
																								name="purchase_process.whatsapp"
																							/>
																						}
																						label="WhatsApp"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="purchase_process.text_sms"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'purchase_process.text_sms'
																								)}
																								name="purchase_process.text_sms"
																							/>
																						}
																						label="Text/SMS"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="purchase_process.email"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'purchase_process.email'
																								)}
																								name="purchase_process.email"
																							/>
																						}
																						label="Email"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																</Grid>
															</FormGroup>
															<FormHelperText>
																{invalid ? error.message : null}
															</FormHelperText>
														</FormControl>
													)}
												/>
											</div>
										</div>
									</div>

									<div className="w-full flex flex-col justify-center items-center gap-6">
										<FormQuestion
											questionNumber="4"
											question="Is your POS System used for the following?"
											instruction="(please select a option from the list of options for each field)"
										/>

										<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
											<div className="col-span-2 lg:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_usage.inventory_management"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_usage.inventory_management"
															label="Inventory Management"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-2 lg:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_usage.transaction_management"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_usage.transaction_management"
															label="Transaction Management"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-2 lg:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_usage.payment_processing"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_usage.payment_processing"
															label="Payment Processing"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_usage.sales_reporting"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_usage.sales_reporting"
															label="Sales Reporting"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_usage.employee_management"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_usage.employee_management"
															label="Employee Management"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-6 lg:col-span-12 xl:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_usage.crm"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_usage.crm"
															label="Customer Relationship Management"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
										</div>
									</div>

									<div className="w-full flex flex-col justify-center items-center gap-6">
										<FormQuestion
											questionNumber="5"
											question="POS System - Vendor and Nature of Relationship"
											instruction="(please select a option from the list of options for each field)"
										/>
										<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
											<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_vendor_relationship.vendor_name"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<DefaultInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_vendor_relationship.vendor_name"
															label="Name of Vendor"
															type="text"
														/>
													)}
												/>
											</div>

											<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_vendor_relationship.vendor_relationship"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_vendor_relationship.vendor_relationship"
															label="Vendor Relationship (if known)"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_vendor_relationship.vendor_provides_support"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_vendor_relationship.vendor_provides_support"
															label="Vendor Provides Support"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_vendor_relationship.internet_dependent"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_vendor_relationship.internet_dependent"
															label="Dependent on the Internet"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
												<Controller
													control={control}
													name="pos_system_vendor_relationship.internet_not_required"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_system_vendor_relationship.internet_not_required"
															label="Can work when Internet is Down"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
										</div>
									</div>

									<div className="w-full flex flex-col justify-center items-center gap-6">
										<FormQuestion
											questionNumber="6"
											question="Nature of use of the POS System"
											instruction="(please select a option from the list of options for each field)"
										/>
										<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
											<div className="col-span-6 lg:col-span-12 w-full">
												<Controller
													control={control}
													name="pos_nature_of_use"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="pos_nature_of_use"
															label="Nature of use of Point-Of-Sale System"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
										</div>
									</div>

									<div className="w-full flex flex-col justify-center items-center gap-6">
										<FormQuestion
											questionNumber="7"
											question="Payment Processing Gateway Used"
											instruction="(please select multiple options if applicable)"
										/>
										<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
											<div className="col-span-6 lg:col-span-12 w-full">
												<Controller
													control={control}
													name="payment_processing_gateway"
													rules={{
														validate: (value) =>
															Object.values(value).includes(true) ||
															'Please select at least one option',
													}}
													render={({
														field: { ref, onChange, ...field },
														fieldState: { error, invalid },
													}) => (
														<FormControl
															{...field}
															ref={ref}
															required
															error={invalid}
															className="w-full"
															component="fieldset">
															<FormGroup>
																<Grid container spacing={2} columns={12}>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="payment_processing_gateway.cash"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'payment_processing_gateway.cash'
																								)}
																								name="payment_processing_gateway.cash"
																							/>
																						}
																						label="Cash"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="payment_processing_gateway.mobile_money"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'payment_processing_gateway.mobile_money'
																								)}
																								name="payment_processing_gateway.mobile_money"
																							/>
																						}
																						label="Mobile Money"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="payment_processing_gateway.cheque"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'payment_processing_gateway.cheque'
																								)}
																								name="payment_processing_gateway.cheque"
																							/>
																						}
																						label="Cheque (Repeat Customers)"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="payment_processing_gateway.nhis"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'payment_processing_gateway.nhis'
																								)}
																								name="payment_processing_gateway.nhis"
																							/>
																						}
																						label="Health Insurance NHIS"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="payment_processing_gateway.private_insurance"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'payment_processing_gateway.private_insurance'
																								)}
																								name="payment_processing_gateway.private_insurance"
																							/>
																						}
																						label="Private Health Insurance"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="payment_processing_gateway.bank_debit_card"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'payment_processing_gateway.bank_debit_card'
																								)}
																								name="payment_processing_gateway.bank_debit_card"
																							/>
																						}
																						label="Bank Debit Card"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																</Grid>
															</FormGroup>
															<FormHelperText>
																{invalid ? error.message : null}
															</FormHelperText>
														</FormControl>
													)}
												/>
											</div>
										</div>
									</div>

									<div className="w-full flex flex-col justify-center items-center gap-6">
										<FormQuestion
											questionNumber="8"
											question="Pharmaceutical Care Services Provided"
											instruction="(please select multiple options if applicable)"
										/>
										<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
											<div className="col-span-6 lg:col-span-12 w-full">
												<Controller
													control={control}
													name="prescriptions_processed"
													rules={{
														validate: (value) =>
															Object.values(value).includes(true) ||
															'Please select at least one option',
													}}
													render={({
														field: { ref, onChange, ...field },
														fieldState: { error, invalid },
													}) => (
														<FormControl
															{...field}
															ref={ref}
															required
															error={invalid}
															className="w-full"
															component="fieldset">
															<FormGroup>
																<Grid container spacing={2} columns={12}>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="pharmaceutical_services.in_person"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'pharmaceutical_services.in_person'
																								)}
																								name="pharmaceutical_services.in_person"
																							/>
																						}
																						label="In-Person"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="pharmaceutical_services.phone_call"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'pharmaceutical_services.phone_call'
																								)}
																								name="pharmaceutical_services.phone_call"
																							/>
																						}
																						label="Phone/Voice Call"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="pharmaceutical_services.text_sms_email_whatsapp"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'pharmaceutical_services.text_sms_email_whatsapp'
																								)}
																								name="pharmaceutical_services.text_sms_email_whatsapp"
																							/>
																						}
																						label="Text/SMS - SMS | WhatsApp | Email"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																	<Grid item xs={12} sm={6} md={6} lg={4}>
																		<div className="w-full">
																			<Controller
																				control={control}
																				name="pharmaceutical_services.website"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'pharmaceutical_services.website'
																								)}
																								name="pharmaceutical_services.website"
																							/>
																						}
																						label="Website"
																					/>
																				)}
																			/>
																		</div>
																	</Grid>
																</Grid>
															</FormGroup>
															<FormHelperText>
																{invalid ? error.message : null}
															</FormHelperText>
														</FormControl>
													)}
												/>
											</div>
										</div>
									</div>

									<div className="w-full flex flex-col justify-center items-center gap-6">
										<FormQuestion
											questionNumber="9"
											question="Drug Delivery Services Available"
											instruction="(please select a option from the list of options for each field)"
										/>
										<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
											<div className="col-span-3 lg:col-span-6 w-full">
												<Controller
													control={control}
													name="delivery_service.services_offered"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="delivery_service.services_offered"
															label="Services Offered"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
											<div className="col-span-3 lg:col-span-6 w-full">
												<Controller
													control={control}
													name="delivery_service.services_provider"
													rules={{
														required: 'Please select an option',
													}}
													render={({
														field: { ref, ...field },
														fieldState: { error, invalid },
													}) => (
														<SelectInput
															{...field}
															ref={ref}
															error={invalid}
															helpertext={invalid ? error.message : null}
															name="delivery_service.services_provider"
															label="Services Provider"
															required
															options={[
																{
																	name: 'Yes',
																	value: 'yes',
																},
																{
																	name: 'No',
																	value: 'no',
																},
															]}
														/>
													)}
												/>
											</div>
										</div>
									</div>

									{pharmacyRenewalData?.business_type?.toLowerCase() ===
										'retail' ||
									pharmacyRenewalData?.business_type?.toLowerCase() ===
										'wholesale/retail' ? (
										<>
											<div className="w-full flex flex-col justify-center items-center gap-6">
												<FormQuestion
													questionNumber="10"
													question="Types of Prescriptions Processed"
													instruction="(please select multiple options if applicable)"
												/>
												<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
													<div className="col-span-6 lg:col-span-12 w-full">
														<Controller
															control={control}
															name="prescriptions_processed"
															rules={{
																validate: (value) =>
																	Object.values(value).includes(true) ||
																	'Please select at least one option',
															}}
															render={({
																field: { ref, onChange, ...field },
																fieldState: { error, invalid },
															}) => (
																<FormControl
																	{...field}
																	ref={ref}
																	required
																	error={invalid}
																	component="fieldset">
																	<FormGroup>
																		<div className="col-span-6 lg:col-span-6 w-full">
																			<Controller
																				control={control}
																				name="prescriptions_processed.written_submitted_in_person"
																				render={({
																					field: { ref, ...field },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'prescriptions_processed.written_submitted_in_person'
																								)}
																								name="prescriptions_processed.written_submitted_in_person"
																							/>
																						}
																						label="Official Written and submitted in-person (Valid)"
																					/>
																				)}
																			/>
																		</div>
																		<div className="col-span-6 lg:col-span-6 w-full">
																			<Controller
																				control={control}
																				name="prescriptions_processed.written_submitted_digitally"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'prescriptions_processed.written_submitted_digitally'
																								)}
																								name="prescriptions_processed.written_submitted_digitally"
																							/>
																						}
																						label="Official Written and submitted digitally (scan or picture)"
																					/>
																				)}
																			/>
																		</div>
																		<div className="col-span-6 lg:col-span-6 w-full">
																			<Controller
																				control={control}
																				name="prescriptions_processed.e_prescription_submitted_digitally"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'prescriptions_processed.e_prescription_submitted_digitally'
																								)}
																								name="prescriptions_processed.e_prescription_submitted_digitally"
																							/>
																						}
																						label="Official E-prescription submitted digitally"
																					/>
																				)}
																			/>
																		</div>
																		<div className="col-span-6 lg:col-span-6 w-full">
																			<Controller
																				control={control}
																				name="prescriptions_processed.physician_request_voice_call"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'prescriptions_processed.physician_request_voice_call'
																								)}
																								name="prescriptions_processed.physician_request_voice_call"
																							/>
																						}
																						label="Physician Request via voice call (Oral)"
																					/>
																				)}
																			/>
																		</div>
																		<div className="col-span-6 lg:col-span-6 w-full">
																			<Controller
																				control={control}
																				name="prescriptions_processed.physician_request_text_sms_whatsapp_email"
																				render={({
																					field: { ref, ...field },
																					//fieldState: { error, invalid },
																				}) => (
																					<FormControlLabel
																						control={
																							<Checkbox
																								{...field}
																								ref={ref}
																								color="blue"
																								checked={watch(
																									'prescriptions_processed.physician_request_text_sms_whatsapp_email'
																								)}
																								name="prescriptions_processed.physician_request_text_sms_whatsapp_email"
																							/>
																						}
																						label="Physician Request via Text/SMS – SMS | WhatsApp | Email"
																					/>
																				)}
																			/>
																		</div>
																	</FormGroup>

																	<FormHelperText>
																		{invalid ? error.message : null}
																	</FormHelperText>
																</FormControl>
															)}
														/>
													</div>
												</div>
											</div>
											<div className="w-full flex flex-col justify-center items-center gap-6">
												<FormQuestion
													questionNumber="11"
													question="NHIS or Private Health Insurance Services"
													instruction="(please select an option)"
												/>
												<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
													<div className="col-span-6 lg:col-span-12 w-full">
														<Controller
															control={control}
															name="insurance_service"
															defaultValue={null}
															rules={{
																required: 'Please select an option',
															}}
															render={({
																field: { ref, onChange, ...field },
																fieldState: { error, invalid },
															}) => (
																<SelectInput
																	{...field}
																	ref={ref}
																	error={invalid}
																	helpertext={invalid ? error.message : null}
																	onChange={(selection) => {
																		onChange(selection);
																		if (selection === 'yes') {
																			setValue(
																				'epharmacy_registration_agreement',
																				true
																			);
																		} else {
																			setValue(
																				'epharmacy_registration_agreement',
																				false
																			);
																		}
																	}}
																	name="insurance_service"
																	label="Do you offer any NHIS or private health insurance services in your pharmacy?"
																	required
																	options={[
																		{
																			name: 'Yes',
																			value: 'yes',
																		},
																		{
																			name: 'No',
																			value: 'no',
																		},
																	]}
																/>
															)}
														/>
													</div>

													{watch('insurance_service') === 'yes' ? (
														<div className="col-span-6 lg:col-span-12 w-full">
															<Controller
																control={control}
																name="selected_insurance_companies"
																defaultValue={{}}
																rules={{
																	validate: (value) =>
																		Object.values(value).includes(true) ||
																		'Please select at least one option',
																}}
																render={({
																	field: { ref, onChange, ...field },
																	fieldState: { error, invalid },
																}) => (
																	<FormControl
																		{...field}
																		ref={ref}
																		required
																		error={invalid}
																		className="w-full"
																		component="fieldset">
																		<FormLabel component="legend">
																			Please select the companies you work with
																			below
																		</FormLabel>

																		<FormGroup className="w-full">
																			<Grid container spacing={2} columns={12}>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.nationwide_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											checked={watch(
																												'selected_insurance_companies.nationwide_insurance'
																											)}
																											color="blue"
																											name="selected_insurance_companies.nationwide_insurance"
																										/>
																									}
																									label="Nationwide Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.metropolitan_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											checked={watch(
																												'selected_insurance_companies.metropolitan_insurance'
																											)}
																											color="blue"
																											name="selected_insurance_companies.metropolitan_insurance"
																										/>
																									}
																									label="Metropolitan Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.acacia_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											color="blue"
																											checked={watch(
																												'selected_insurance_companies.acacia_insurance'
																											)}
																											name="selected_insurance_companies.acacia_insurance"
																										/>
																									}
																									label="Acacia Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.premier_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											color="blue"
																											checked={watch(
																												'selected_insurance_companies.premier_insurance'
																											)}
																											name="selected_insurance_companies.premier_insurance"
																										/>
																									}
																									label="Premier Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.apex_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											color="blue"
																											checked={watch(
																												'selected_insurance_companies.apex_insurance'
																											)}
																											name="selected_insurance_companies.apex_insurance"
																										/>
																									}
																									label="Apex Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.cosmopolitan_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											color="blue"
																											checked={watch(
																												'selected_insurance_companies.cosmopolitan_insurance'
																											)}
																											name="selected_insurance_companies.cosmopolitan_insurance"
																										/>
																									}
																									label="Cosmopolitan Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.vitality_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											color="blue"
																											checked={watch(
																												'selected_insurance_companies.vitality_insurance'
																											)}
																											name="selected_insurance_companies.vitality_insurance"
																										/>
																									}
																									label="Vitality Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.ace_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											color="blue"
																											checked={watch(
																												'selected_insurance_companies.ace_insurance'
																											)}
																											name="selected_insurance_companies.ace_insurance"
																										/>
																									}
																									label="Ace Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.equity_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											color="blue"
																											checked={watch(
																												'selected_insurance_companies.equity_insurance'
																											)}
																											name="selected_insurance_companies.equity_insurance"
																										/>
																									}
																									label="Equity Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={6} md={6} lg={3}>
																					<div className=" w-full">
																						<Controller
																							control={control}
																							defaultValue={false}
																							name="selected_insurance_companies.gab_insurance"
																							render={({
																								field: { ref, ...field },
																							}) => (
																								<FormControlLabel
																									control={
																										<Checkbox
																											{...field}
																											ref={ref}
																											color="blue"
																											checked={watch(
																												'selected_insurance_companies.gab_insurance'
																											)}
																											name="selected_insurance_companies.gab_insurance"
																										/>
																									}
																									label="GAB Insurance"
																								/>
																							)}
																						/>
																					</div>
																				</Grid>
																			</Grid>
																		</FormGroup>
																		<FormHelperText>
																			{invalid ? error.message : null}
																		</FormHelperText>
																	</FormControl>
																)}
															/>
														</div>
													) : watch('insurance_service') === 'no' ? (
														<>
															<div className="col-span-6 lg:col-span-12 w-full flex justify-center items-center">
																<Typography
																	variant="paragraph"
																	className="text-base font-light">
																	Thousands of prescriptions are being fulfilled
																	on National Electronic Pharmacy Platform each
																	week.
																</Typography>
															</div>
															<div className="col-span-6 lg:col-span-12 w-full">
																<Controller
																	control={control}
																	name="eprescription_interest"
																	defaultValue={null}
																	rules={{
																		required: 'Please select an option',
																	}}
																	render={({
																		field: { ref, onChange, ...field },
																		fieldState: { error, invalid },
																	}) => (
																		<SelectInput
																			{...field}
																			ref={ref}
																			error={invalid}
																			helpertext={
																				invalid ? error.message : null
																			}
																			onChange={(selection) => {
																				onChange(selection);
																				if (selection === 'yes') {
																					setValue(
																						'epharmacy_registration_agreement',
																						true
																					);
																				} else {
																					setValue(
																						'epharmacy_registration_agreement',
																						false
																					);
																				}
																			}}
																			name="eprescription_interest"
																			label="Are you interested in signing up your pharmacy to receive e-prescriptions?"
																			required
																			options={[
																				{
																					name: 'Yes',
																					value: 'yes',
																				},
																				{
																					name: 'No',
																					value: 'no',
																				},
																			]}
																		/>
																	)}
																/>
															</div>
														</>
													) : null}
												</div>
											</div>
										</>
									) : null}
								</div>
							</FormSection>

							{watch('insurance_service') === 'yes' ||
							watch('eprescription_interest') ===
								'yes' ? null : pharmacyRenewalData?.business_type?.toLowerCase() !==
									'retail' &&
							  pharmacyRenewalData?.business_type?.toLowerCase() !==
									'wholesale/retail' &&
							  pharmacyRenewalData?.is_epharmacy === false ? (
								<>
									<div className="w-full">
										<Controller
											control={control}
											name="epharmacy_registration_agreement"
											defaultValue={false}
											render={({
												field: { ref, ...field },
												fieldState: { error, invalid },
											}) => (
												<FormControl error={invalid}>
													<FormControlLabel
														control={
															<Checkbox
																{...field}
																ref={ref}
																color="blue"
																name="epharmacy_registration_agreement"
															/>
														}
														label="I would like to register for ePharmacy"
													/>

													<FormHelperText>{error?.message}</FormHelperText>
												</FormControl>
											)}
										/>
									</div>

									{watch('epharmacy_registration_agreement') === true ? (
										<div className="w-full bg-[#B4B4FF] gap-5 text-[#0404FF] rounded-lg p-5 lg:p-8 flex flex-col justify-center items-start">
											<Typography variant="h4" className="w-full text-left">
												Please take note of the following:
											</Typography>

											{epharmacyFormNoticePoints.map(({ point, id }) => (
												<div
													key={id}
													className="w-full flex justify-start items-start gap-3">
													<Typography
														variant="paragraph"
														className="font-medium">
														{id}
													</Typography>
													<Typography
														variant="paragraph"
														className="font-medium">
														{point}
													</Typography>
												</div>
											))}
										</div>
									) : null}
								</>
							) : null}

							{watch('insurance_service') === 'yes' ||
							watch('eprescription_interest') === 'yes' ? (
								<div className="w-full bg-[#B4B4FF] gap-5 text-[#0404FF] rounded-lg p-5 lg:p-8 flex flex-col justify-center items-start">
									<Typography variant="h4" className="w-full text-left">
										Please take note of the following:
									</Typography>

									{epharmacyFormNoticePoints.map(({ point, id }) => (
										<div
											key={id}
											className="w-full flex justify-start items-start gap-3">
											<Typography variant="paragraph" className="font-medium">
												{id}
											</Typography>
											<Typography variant="paragraph" className="font-medium">
												{point}
											</Typography>
										</div>
									))}
								</div>
							) : null}

							<div className="w-full bg-red-300/50 gap-5 text-red-600 rounded-lg p-5 lg:p-8 flex flex-col justify-center items-start">
								<Typography variant="h4" className="w-full text-left">
									Submitting this form implies that
								</Typography>

								<div className="w-full flex justify-start items-start gap-3">
									<Typography variant="paragraph" className="font-medium">
										1
									</Typography>
									<Typography variant="paragraph" className="font-medium">
										You affirm that all the information provided in the form are
										true and correct to the best of your knowledge
									</Typography>
								</div>
								<div className="w-full flex justify-start items-start gap-3">
									<Typography variant="paragraph" className="font-medium">
										2
									</Typography>
									<Typography variant="paragraph" className="font-medium">
										You agree to all the terms stated above
									</Typography>
								</div>
							</div>

							<div className="w-full">
								<Controller
									control={control}
									name="terms_and_conditions_agreement"
									rules={{
										required: 'Please accept terms and conditions to continue',
									}}
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<FormControl required error={invalid}>
											<FormControlLabel
												control={
													<Checkbox
														{...field}
														ref={ref}
														color="blue"
														name="terms_and_conditions_agreement"
													/>
												}
												label="I agree to the terms and conditions prescribed by the Pharmacy Council"
											/>

											<FormHelperText>{error?.message}</FormHelperText>
										</FormControl>
									)}
								/>
							</div>

							<div className="flex w-full justify-end items-center gap-5">
								<ButtonComponent title="back" reset onClick={handleOpen} />
								<ButtonComponent type="submit" title="submit" />
							</div>
						</form>

						<Dialog open={open} handler={handleOpen} size="xl">
							<DialogHeader className="w-full justify-center text-center">
								Going back will clear all inputs made on this form, are you sure
								you want to continue?
							</DialogHeader>

							<DialogFooter className="flex justify-center gap-5">
								<ButtonComponent title="cancel" reset onClick={handleOpen} />

								<ButtonComponent
									onClick={() => {
										handleOpen();
										handleReset();
									}}
									title="confirm"
								/>
							</DialogFooter>
						</Dialog>
					</div>
				)}
			</div>

			<ConfirmApplication />
		</>
	);
};

export default EPharmacyForm;
