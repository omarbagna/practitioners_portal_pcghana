import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import {
	ButtonComponent,
	DefaultInput,
	FormSection,
	FormTitle,
	SelectInput,
} from '../../components';
//import { BiEdit } from 'react-icons/bi';
import { useAuthContext } from '../../context/AuthContext';
import { Dialog, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import {
	countries,
	regions,
	relicensurePersonalDataInputs,
	institutionOptions,
	employerOptions,
} from './data';
import { useQuery } from 'react-query';
import { axiosPrivate } from '../../api/axios';
import { toast } from 'react-toastify';
import { ConfirmApplication, SkeletonLoad } from '../../layout';
import { useDataContext } from '../../context/DataContext';
import axios from 'axios';
import { useStateContext } from '../../context/StateContext';

const RelicensureForm = () => {
	const { user, logout } = useAuthContext();
	const { cpdData, pharmacistData } = useDataContext();
	const { setSubmissionSuccess, setRelicensureProcessing } = useStateContext();
	const navigate = useNavigate();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [open, setOpen] = useState(false);
	const [applicantImage, setApplicantImage] = useState(null);

	//const [file, setFile] = useState(null);

	const [employmentDataComponentCount, setEmploymentDataComponentCount] =
		useState(0);
	const [employmentDataComponentVisible, setEmploymentDataComponentVisible] =
		useState([]);

	const hiddenApplicantImageInput = useRef(null);
	//const formData = new FormData();

	/*let base64;

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};*/

	const handleApplicantImageClick = (event) => {
		hiddenApplicantImageInput.current.click();
	};

	const handleApplicantImageChange = (event) => {
		const fileUploaded = event.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(fileUploaded);

		reader.onload = (e) => {
			setApplicantImage(e.target.result);
		};

		//fileUploaded && setFile(fileUploaded);
		//fileUploaded && setImage(URL.createObjectURL(fileUploaded));
	};

	const {
		handleSubmit,
		control,
		//watch,
		reset,
	} = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			registration_number:
				pharmacistData?.registration_number === null
					? ''
					: pharmacistData?.registration_number,
			person_title: pharmacistData?.title === null ? '' : pharmacistData?.title,
			person_surname:
				pharmacistData?.last_name === null ? '' : pharmacistData?.last_name,
			person_first_name:
				pharmacistData?.first_name === null ? '' : pharmacistData?.first_name,
			person_othernames:
				pharmacistData?.middle_name === null ? '' : pharmacistData?.middle_name,
			person_nationality:
				pharmacistData?.nationality === null ? '' : pharmacistData?.nationality,
			person_postal_address:
				pharmacistData?.postal_address === null
					? ''
					: pharmacistData?.postal_address,
			person_town:
				pharmacistData?.residential_city === null
					? ''
					: pharmacistData?.residential_city,
			residential_region:
				pharmacistData?.residential_region === null ||
				pharmacistData?.residential_region === ''
					? null
					: pharmacistData?.residential_region,
			person_mobile_number:
				pharmacistData?.phone === null ? '' : pharmacistData?.phone,
			person_landline: '',
			person_email: pharmacistData?.email === null ? '' : pharmacistData?.email,
		},
	});

	//console.log(user);

	const fetchPharmacistDetails = () => {
		return axiosPrivate.get(
			`api_pharmacist/getPharmacistDetailsByRegNum?r=${user?.registration_number}`,
			{
				headers: { Token: user?.token, Userid: user?.id, Type: user?.type },
			}
		);
	};

	const { data, isLoading } = useQuery(
		'pharmacist_details',
		fetchPharmacistDetails
	);

	useEffect(() => {
		if (data) {
			if (data?.data?.status === '0') {
				toast.error('Session timed out, please login again to continue');
				logout();
			}
		}
		if (pharmacistData?.is_in_application === '1') {
			toast.error(
				'A relicensure application has already been received and is processing'
			);
			navigate('/', { replace: true });
		} else if (pharmacistData?.is_provisional !== 'no') {
			toast.error('Cannot renew a provisional license');
			navigate('/', { replace: true });
		} else if (pharmacistData?.is_superintendent === '1') {
			toast.error(
				'You are already a superintendant for another pharmacy and cannot fill this form'
			);
			navigate('/', { replace: true });
		} else {
			return;
		}
	}, [navigate, data, logout, pharmacistData]);

	//console.log(pharmacyData);
	const formData = new FormData();

	const handleFormSubmit = async (data) => {
		console.log(data);
		setIsSubmitting(true);
		let finalFormData = {};
		//console.log({ data });

		finalFormData = {
			method: 'SAVE_PHARMACIST_LICENSE_DATA',
			api_key: '42353d5c33b45b0a8246b9bf0cd46820e516e3e4',
			registration_number: data.registration_number,
			title: data.person_title,
			surname: data.person_surname,
			firstname: data.person_first_name,
			othernames: data.person_othernames,
			nationality: data.person_nationality,
			postal_address: data.person_postal_address,

			town: data.person_town,
			residential_region: data.residential_region,
			phone: data.person_mobile_number,
			business_number: data.person_landline,
			email: data.person_email,
			employment_data: data.employment_data,

			pharmacist_cpd: cpdData,
		};

		formData.append('reg_num', user?.registration_number);
		formData.append('phone', finalFormData?.phone);
		formData.append('email', finalFormData?.email);
		formData.append('postal_address', finalFormData?.postal_address);
		formData.append(
			'WorkHistoryObject',
			JSON.stringify(finalFormData?.employment_data)
		);

		let responseData = {};

		try {
			const response = await axiosPrivate.post(
				'api/saveRetentionApplication',
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

			//console.log(response);

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
					const privateResponse = await axios.post(
						'https://goldenministersfellowship.org/pcghana-api/',
						JSON.stringify(finalFormData),
						{
							headers: { 'Content-Type': 'application/json' },
							//withCredentials: true,
						}
					);
					responseData = privateResponse.data;
					//console.log(responseData);

					if (responseData?.resp_code === '000') {
						toast.success('Application submission successful');

						setIsSubmitting(false);
						setSubmissionSuccess(true);
						setRelicensureProcessing(true);
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
				//toast.success('Application Submitted Successful');

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

		setIsSubmitting(false);
	};

	const onError = (errors) => {
		toast.error('Please fill all required fields');
	};

	const addEmploymentDataComponent = () => {
		setEmploymentDataComponentCount((prev) => prev + 1);
		setEmploymentDataComponentVisible([
			...employmentDataComponentVisible,
			employmentDataComponentCount + 1,
		]);
	};

	const removeEmploymentDataComponent = (item) => {
		setEmploymentDataComponentCount((prev) => prev - 1);
		const index = employmentDataComponentVisible.indexOf(item);
		if (index > -1) {
			employmentDataComponentVisible.splice(index, 1);
		}

		setEmploymentDataComponentVisible(employmentDataComponentVisible);
	};

	const handleOpen = () => setOpen(!open);
	const handleReset = () => {
		setApplicantImage(null);
		reset();
		navigate('/');
	};

	return (
		<>
			<div className="w-full h-full flex flex-col justify-start items-center gap-10 mt-10">
				<FormTitle title="Pharmacist Relicensure Application" />

				{isLoading || isSubmitting ? (
					<div className="w-full h-full bg-gradient-to-b from-[#0404FF] to-blue-600 rounded-xl shadow-blue-400/30 shadow-lg flex justify-center items-center">
						<SkeletonLoad />
					</div>
				) : (
					<form
						onSubmit={handleSubmit(handleFormSubmit, onError)}
						className="w-full h-full flex flex-col justify-start items-center gap-8 mt-6">
						<FormSection sectionName="personal data">
							<div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 w-full">
								<div className="flex w-full  justify-center gap-5 items-end">
									<Avatar
										alt="pharmacist"
										src={
											applicantImage
												? applicantImage
												: `https://manager.pcghana.org/assets/images/pharmacists_pictures/${user?.picture}`
										}
										sx={{ width: 80, height: 80 }}
									/>

									<div className="w-1/2">
										<ButtonComponent
											title="upload"
											onClick={handleApplicantImageClick}
											type="button"
											color="blue"
										/>
									</div>

									<input
										type="file"
										ref={hiddenApplicantImageInput}
										onChange={handleApplicantImageChange}
										id="employee_picture"
										name="employee_picture"
										accept="image/png, image/jpeg"
										hidden
									/>
								</div>

								{relicensurePersonalDataInputs.map((inputProps) => (
									<Controller
										control={control}
										key={inputProps.name}
										name={inputProps.name}
										rules={inputProps.rules}
										render={({
											field: { ref, ...field },
											fieldState: { error, invalid },
										}) => {
											if (inputProps.inputType === 'text-input') {
												return (
													<DefaultInput
														{...field}
														ref={ref}
														error={invalid}
														helpertext={invalid ? error.message : null}
														name={inputProps.name}
														label={inputProps.label}
														type={inputProps.type}
														disabled={inputProps.disabled}
														labelProps={inputProps.labelProps}
														required={inputProps.required}
													/>
												);
											} else if (inputProps.inputType === 'select-input') {
												return (
													<SelectInput
														{...field}
														ref={ref}
														error={invalid}
														helpertext={invalid ? error.message : null}
														name={inputProps.name}
														label={inputProps.label}
														required={inputProps.required}
														options={inputProps.options}
													/>
												);
											}
										}}
									/>
								))}
							</div>
						</FormSection>

						<FormSection sectionName="employment data (add up to a maximum of 3 most recent)">
							{employmentDataComponentCount !== 0
								? [0, 1, 2].map((inputField) => {
										if (
											employmentDataComponentVisible.includes(inputField + 1)
										) {
											return (
												<div
													key={inputField}
													className="relative w-full h-full flex gap-2 justify-end items-center rounded-md shadow-lg bg-gray-50 p-4">
													<div className="flex flex-col justify-center items-start md:grid place-items-center md:grid-cols-3 gap-5 mr-4 lg:mr-8 lg:gap-8 w-full">
														<Controller
															control={control}
															name={`employment_data[${inputField}].institution_name`}
															defaultValue=""
															render={({
																field: { ref, ...field },
																fieldState: { error, invalid },
															}) => (
																<DefaultInput
																	{...field}
																	ref={ref}
																	error={invalid}
																	helpertext={invalid ? error.message : null}
																	name={`employment_data[${inputField}].institution_name`}
																	label="Institution Name"
																	type="text"
																	required
																/>
															)}
														/>
														<Controller
															control={control}
															name={`employment_data[${inputField}].institution_type`}
															defaultValue=""
															render={({
																field: { ref, ...field },
																fieldState: { error, invalid },
															}) => (
																<SelectInput
																	{...field}
																	ref={ref}
																	error={invalid}
																	helpertext={invalid ? error.message : null}
																	name={`employment_data[${inputField}].institution_type`}
																	label="Institution Type"
																	required
																	options={institutionOptions}
																/>
															)}
														/>
														<Controller
															control={control}
															name={`employment_data[${inputField}].employer_type`}
															defaultValue=""
															render={({
																field: { ref, ...field },
																fieldState: { error, invalid },
															}) => (
																<SelectInput
																	{...field}
																	ref={ref}
																	error={invalid}
																	helpertext={invalid ? error.message : null}
																	name={`employment_data[${inputField}].employer_type`}
																	label="Employer Type"
																	required
																	options={employerOptions}
																/>
															)}
														/>
														<Controller
															control={control}
															name={`employment_data[${inputField}].position`}
															defaultValue=""
															render={({
																field: { ref, ...field },
																fieldState: { error, invalid },
															}) => (
																<DefaultInput
																	{...field}
																	ref={ref}
																	error={invalid}
																	helpertext={invalid ? error.message : null}
																	name={`employment_data[${inputField}].position`}
																	label="Postion"
																	type="text"
																	//disabled
																	labelProps={{ style: { color: '#000' } }}
																	required
																/>
															)}
														/>
														<Controller
															control={control}
															name={`employment_data[${inputField}].region`}
															defaultValue=""
															render={({
																field: { ref, ...field },
																fieldState: { error, invalid },
															}) => (
																<SelectInput
																	{...field}
																	ref={ref}
																	error={invalid}
																	helpertext={invalid ? error.message : null}
																	name={`employment_data[${inputField}].region`}
																	label="Region"
																	required
																	options={regions}
																/>
															)}
														/>
														<Controller
															control={control}
															name={`employment_data[${inputField}].country`}
															defaultValue=""
															render={({
																field: { ref, ...field },
																fieldState: { error, invalid },
															}) => (
																<SelectInput
																	{...field}
																	ref={ref}
																	error={invalid}
																	helpertext={invalid ? error.message : null}
																	name={`employment_data[${inputField}].country`}
																	label="Country"
																	required
																	options={countries}
																/>
															)}
														/>
														<div className="col-span-3 w-full flex flex-wrap md:flex-nowrap justify-center items-center gap-5">
															<Controller
																control={control}
																name={`employment_data[${inputField}].start_date`}
																defaultValue=""
																render={({
																	field: { ref, ...field },
																	fieldState: { error, invalid },
																}) => (
																	<DefaultInput
																		{...field}
																		ref={ref}
																		error={invalid}
																		helpertext={invalid ? error.message : null}
																		name={`employment_data[${inputField}].start_date`}
																		label="Start Date"
																		type="date"
																		//disabled
																		labelProps={{ style: { color: '#000' } }}
																		required
																	/>
																)}
															/>
															<Controller
																control={control}
																name={`employment_data[${inputField}].end_date`}
																defaultValue=""
																render={({
																	field: { ref, ...field },
																	fieldState: { error, invalid },
																}) => (
																	<DefaultInput
																		{...field}
																		ref={ref}
																		error={invalid}
																		helpertext={invalid ? error.message : null}
																		name={`employment_data[${inputField}].end_date`}
																		label="End Date"
																		type="date"
																		//disabled
																		labelProps={{ style: { color: '#000' } }}
																	/>
																)}
															/>
														</div>
													</div>

													<div
														onClick={() =>
															removeEmploymentDataComponent(inputField + 1)
														}
														className="group absolute top-0 right-0 flex justify-center items-center transition-all duration-150 ease-in rounded-r-md w-5 lg:w-6  md:hover:w-8 h-full bg-red-400 hover:shadow-lg hover:shadow-red-400/50 hover:bg-red-500 cursor-pointer">
														<Typography
															variant="paragraph"
															color="white"
															className="transition-all duration-150 ease-in tracking-widest group-hover:tracking-normal text-center text-sm uppercase rotate-90">
															remove
														</Typography>
													</div>
												</div>
											);
										} else return null;
								  })
								: null}

							{employmentDataComponentCount !== 3 ? (
								<div className="w-full flex justify-end items-start">
									<ButtonComponent
										type="button"
										onClick={addEmploymentDataComponent}
										title="add new"
										color="cyan"
									/>
								</div>
							) : null}
						</FormSection>

						<div className="flex w-full justify-end items-center gap-5">
							<ButtonComponent title="back" reset onClick={handleOpen} />
							<ButtonComponent type="submit" title="submit" />
						</div>
					</form>
				)}

				<Dialog open={open} handler={handleOpen} size="xl">
					<DialogHeader className="w-full justify-center text-center">
						Going back will clear all inputs made on this form, are you sure you
						want to continue?
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

			<ConfirmApplication />
		</>
	);
};

export default RelicensureForm;
