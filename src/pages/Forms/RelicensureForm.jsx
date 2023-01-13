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
import { BiEdit } from 'react-icons/bi';
import { useAuthContext } from '../../context/AuthContext';
import { Dialog, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { countries, employmentDataFields, supportStaffFields } from './data';
import { useQuery } from 'react-query';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';
import { SkeletonLoad } from '../../layout';
import { useDataContext } from '../../context/DataContext';

const RelicensureForm = () => {
	const { user, logout } = useAuthContext();
	const { pharmacyData, setPharmacyData, relicensureData, setRelicensureData } =
		useDataContext();
	const navigate = useNavigate();

	const [foundPharmacy, setFoundPharmacy] = useState(false);
	const [editFacilityData, setEditFacilityData] = useState(true);
	const [editPersonalData, setEditPersonalData] = useState(true);
	const [open, setOpen] = useState(false);
	const [applicantImage, setApplicantImage] = useState(null);
	const [searchParams, setSearchParams] = useState('');

	//const [file, setFile] = useState(null);

	const [employmentDataComponentCount, setEmploymentDataComponentCount] =
		useState(0);
	const [employmentDataComponentVisible, setEmploymentDataComponentVisible] =
		useState([]);
	const [supportStaffComponentCount, setSupportStaffComponentCount] =
		useState(0);
	const [supportStaffComponentVisible, setSupportStaffComponentVisible] =
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

	const { control: controlSearch, handleSubmit: handleSubmitSearch } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			pharmacy_license_number: '',
		},
	});

	const { handleSubmit, control, watch, reset } = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			pharmacy_name: '',
			license_number: '',
			business_type: '',
			region: '',
			district: '',
			town: '',
			street: '',
			location: '',
			gps_address: '',
			phone_number: '',
			pharmacy_email: '',
			weekdays_start_time: '',
			weekdays_end_time: '',
			weekend_start_time: '',
			weekend_end_time: '',
			registration_number:
				user?.registration_number === null ? '--' : user?.registration_number,
			person_title: user?.title === null ? '--' : user?.title,
			person_surname: user?.last_name === null ? '--' : user?.last_name,
			person_first_name: user?.first_name === null ? '--' : user?.mobile_name,
			person_othernames: user?.mobile_name === null ? '--' : user?.mobile_name,
			person_nationality: user?.nationality === null ? '--' : user?.nationality,
			person_postal_address:
				user?.postal_address === null ? '--' : user?.postal_address,
			person_town:
				user?.residential_city === null ? '--' : user?.residential_city,
			person_mobile_number: user?.phone === null ? '--' : user?.phone,
			person_landline: '',
			person_email: user?.email === null ? '--' : user?.email,
		},
	});

	const fetchPharmacyDetails = (searchValue) => {
		console.log('this is the search value: ', searchValue);
		return axios.get(
			`api_pharmacy/getPharmacyDetailsByLicNum?lic_num=${searchValue}`,
			{
				headers: {
					Token: user?.token,
					Userid: user?.id,
					Type: user?.type,
				},
			}
		);
	};

	const onSuccess = (data) => {
		if (data.data.data !== false) {
			setPharmacyData(data.data.data);

			setFoundPharmacy(true);
		}
	};

	const { data, isLoading, isFetching, refetch } = useQuery(
		'pharmacy_details',
		async () => await fetchPharmacyDetails(searchParams),
		{
			enabled: false,
			onSuccess,
		}
	);

	useEffect(() => {
		refetch();
	}, [searchParams, refetch]);

	useEffect(() => {
		if (pharmacyData && relicensureData === null) {
			reset({
				pharmacy_name: pharmacyData?.name === null ? '--' : pharmacyData?.name,
				license_number:
					pharmacyData?.license_number === null
						? '--'
						: pharmacyData?.license_number,
				business_type:
					pharmacyData?.business_type?.name === null
						? '--'
						: pharmacyData?.business_type?.name,
				region:
					pharmacyData?.region?.name === null
						? '--'
						: pharmacyData?.region?.name,
				district:
					pharmacyData?.district?.name === null
						? '--'
						: pharmacyData?.district?.name,
				town: pharmacyData?.town === null ? '--' : pharmacyData?.town,
				street: pharmacyData?.street === null ? '--' : pharmacyData?.street,
				location:
					pharmacyData?.house_number === null
						? '--'
						: pharmacyData?.house_number,
				gps_address:
					pharmacyData?.ghana_post_code === null
						? '--'
						: pharmacyData?.ghana_post_code,
				phone_number: pharmacyData?.phone === null ? '--' : pharmacyData?.phone,
				pharmacy_email:
					pharmacyData?.email === null ? '--' : pharmacyData?.email,
				weekdays_start_time: '',
				weekdays_end_time: '',
				weekend_start_time: '',
				weekend_end_time: '',
				registration_number:
					user?.registration_number === null ? '--' : user?.registration_number,
				person_title: user?.title === null ? '--' : user?.title,
				person_surname: user?.last_name === null ? '--' : user?.last_name,
				person_first_name: user?.first_name === null ? '--' : user?.first_name,
				person_othernames:
					user?.mobile_name === null ? '--' : user?.mobile_name,
				person_nationality:
					user?.nationality === null ? '--' : user?.nationality,
				person_postal_address:
					user?.postal_address === null ? '--' : user?.postal_address,
				person_town:
					user?.residential_city === null ? '--' : user?.residential_city,
				person_mobile_number: user?.phone === null ? '--' : user?.phone,
				person_landline: '',
				person_email: user?.email === null ? '--' : user?.email,
			});

			setFoundPharmacy(true);
		} else if (pharmacyData && relicensureData) {
			reset({
				pharmacy_name:
					relicensureData?.pharmacy_name === null
						? '--'
						: relicensureData?.pharmacy_name,
				license_number:
					relicensureData?.license_number === null
						? '--'
						: relicensureData?.license_number,
				business_type:
					relicensureData?.business_type === null
						? '--'
						: relicensureData?.business_type,
				region:
					relicensureData?.region === null ? '--' : relicensureData?.region,
				district:
					relicensureData?.district === null ? '--' : relicensureData?.district,
				town: relicensureData?.town === null ? '--' : relicensureData?.town,
				street:
					relicensureData?.street === null ? '--' : relicensureData?.street,
				location:
					relicensureData?.location === null ? '--' : relicensureData?.location,
				gps_address:
					relicensureData?.gps_address === null
						? '--'
						: relicensureData?.gps_address,
				phone_number:
					relicensureData?.phone_number === null
						? '--'
						: relicensureData?.phone_number,
				pharmacy_email:
					relicensureData?.pharmacy_email === null
						? '--'
						: relicensureData?.pharmacy_email,
				weekdays_start_time:
					relicensureData?.weekdays_start_time === null
						? '--'
						: relicensureData?.weekdays_start_time,
				weekdays_end_time:
					relicensureData?.weekdays_end_time === null
						? '--'
						: relicensureData?.weekdays_end_time,
				weekend_start_time:
					relicensureData?.weekend_start_time === null
						? '--'
						: relicensureData?.weekend_start_time,
				weekend_end_time:
					relicensureData?.weekend_end_time === null
						? '--'
						: relicensureData?.weekend_end_time,
				registration_number:
					user?.registration_number === null ? '--' : user?.registration_number,
				person_title: user?.title === null ? '--' : user?.title,
				person_surname: user?.last_name === null ? '--' : user?.last_name,
				person_first_name: user?.first_name === null ? '--' : user?.first_name,
				person_othernames:
					user?.mobile_name === null ? '--' : user?.mobile_name,
				person_nationality:
					user?.nationality === null ? '--' : user?.nationality,
				person_postal_address:
					relicensureData?.person_postal_address === null
						? '--'
						: relicensureData?.person_postal_address,
				person_town:
					user?.residential_city === null ? '--' : user?.residential_city,
				person_mobile_number:
					relicensureData?.person_mobile_number === null
						? '--'
						: relicensureData?.person_mobile_number,
				person_landline: '',
				person_email:
					relicensureData?.person_email === null
						? '--'
						: relicensureData?.person_email,
			});

			setFoundPharmacy(true);
		}
	}, [user, relicensureData, pharmacyData, reset]);

	useEffect(() => {
		if (data) {
			if (data?.data?.status === '0') {
				toast.error('Session timed out, please login again to continue');
				logout();
			}
		}
	}, [data, logout]);

	//console.log(pharmacyData);

	//console.log(pharmacyData);

	const handleSearch = (data) => {
		setFoundPharmacy(false);
		setSearchParams(data.pharmacy_license_number);
		//refetch()
		//fetchPharmacyDetails('', data.pharmacy_license_number);
	};

	const handleFormSubmit = (data) => {
		console.log({ data });
		setRelicensureData(data);
		navigate('/relicensure-application-epharmacy');
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
		const index = employmentDataComponentVisible.indexOf(item.id);
		if (index > -1) {
			employmentDataComponentVisible.splice(index, 1);
		}

		setEmploymentDataComponentVisible(employmentDataComponentVisible);
	};

	const addSupportStaffComponent = () => {
		setSupportStaffComponentCount((prev) => prev + 1);
		setSupportStaffComponentVisible([
			...supportStaffComponentVisible,
			supportStaffComponentCount + 1,
		]);
	};

	const removeSupportStaffComponent = (item) => {
		setSupportStaffComponentCount((prev) => prev - 1);
		const index = supportStaffComponentVisible.indexOf(item.id);
		if (index > -1) {
			supportStaffComponentVisible.splice(index, 1);
		}

		setSupportStaffComponentVisible(supportStaffComponentVisible);
	};

	const handleOpen = () => setOpen(!open);
	const handleReset = () => {
		setApplicantImage(null);
		reset();
		navigate('/');
	};

	return (
		<div className="w-full h-full flex flex-col justify-start items-center gap-10 mt-10">
			<FormTitle title="Pharmacy Re - Licensure Application" />

			<form
				onSubmit={handleSubmitSearch(handleSearch)}
				className="w-full flex flex-col md:flex-row justify-center items-center gap-5">
				<div className="w-full md:w-4/5">
					<Controller
						control={controlSearch}
						name="pharmacy_license_number"
						/*rules={{
							required: 'Please enter registration number to Login',
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
								name="pharmacy_license_number"
								label="Find My Pharmacy (pharmacy license number)"
								type="text"
								required
							/>
						)}
					/>
				</div>

				<div className="w-full md:w-1/5">
					<ButtonComponent width type="submit" title="search" />
				</div>
			</form>

			{foundPharmacy ? (
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
											disabled={editFacilityData}
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
											value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
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
											disabled={editFacilityData}
											labelProps={{ style: { color: '#000' } }}
											required
										/>
									)}
								/>
							</div>
							<div className="col-span-3 lg:col-span-6 w-full">
								<Controller
									control={control}
									name="weekdays_start_time"
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<DefaultInput
											{...field}
											ref={ref}
											error={invalid}
											helpertext={invalid ? error.message : null}
											name="weekdays_start_time"
											label="Weekdays Start Time"
											type="time"
											disabled={editFacilityData}
											labelProps={{ style: { color: '#000' } }}
											required
										/>
									)}
								/>
							</div>
							<div className="col-span-3 lg:col-span-6 w-full">
								<Controller
									control={control}
									name="weekdays_end_time"
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<DefaultInput
											{...field}
											ref={ref}
											error={invalid}
											helpertext={invalid ? error.message : null}
											name="weekdays_end_time"
											label="Weekdays End Time"
											type="time"
											disabled={editFacilityData}
											labelProps={{ style: { color: '#000' } }}
											required
										/>
									)}
								/>
							</div>

							<div className="col-span-3 lg:col-span-6 w-full">
								<Controller
									control={control}
									name="weekend_start_time"
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<DefaultInput
											{...field}
											ref={ref}
											error={invalid}
											helpertext={invalid ? error.message : null}
											name="weekend_start_time"
											label="Weekend Start Time"
											type="time"
											disabled={editFacilityData}
											labelProps={{ style: { color: '#000' } }}
											required
										/>
									)}
								/>
							</div>
							<div className="col-span-3 lg:col-span-6 w-full">
								<Controller
									control={control}
									name="weekend_end_time"
									render={({
										field: { ref, ...field },
										fieldState: { error, invalid },
									}) => (
										<DefaultInput
											{...field}
											ref={ref}
											error={invalid}
											helpertext={invalid ? error.message : null}
											name="weekend_end_time"
											label="Weekend End Time"
											type="time"
											disabled={editFacilityData}
											labelProps={{ style: { color: '#000' } }}
											required
										/>
									)}
								/>
							</div>
						</div>

						<div className="w-full flex justify-end items-center">
							{editFacilityData ? (
								<ButtonComponent
									title={
										<div className="flex justify-center items-center gap-3">
											<BiEdit className="text-base" />
											edit
										</div>
									}
									onClick={() => setEditFacilityData(false)}
									type="button"
									color="purple"
								/>
							) : (
								<ButtonComponent
									title="cancel"
									onClick={() => setEditFacilityData(true)}
									type="button"
									color="red"
								/>
							)}
						</div>
					</FormSection>

					<FormSection sectionName="personal data">
						<div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 w-full">
							{editPersonalData ? (
								<Avatar
									alt="pharmacist"
									src={
										applicantImage
											? applicantImage
											: `https://manager.pcghana.org/assets/images/pharmacists_pictures/${user?.picture}`
									}
									sx={{ width: 80, height: 80 }}
								/>
							) : (
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
							)}

							<Controller
								control={control}
								name="registration_number"
								/*rules={{
											required: 'Please enter registration number to Login',
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
										name="registration_number"
										label="Registration Number"
										type="text"
										disabled
										labelProps={{ style: { color: '#000' } }}
										required
									/>
								)}
							/>

							<Controller
								control={control}
								name="person_title"
								/*rules={{
											required: 'Please enter registration number to Login',
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
										name="person_title"
										label="Title"
										type="text"
										disabled
										labelProps={{ style: { color: '#000' } }}
										required
									/>
								)}
							/>
							<Controller
								control={control}
								name="person_surname"
								render={({
									field: { ref, ...field },
									fieldState: { error, invalid },
								}) => (
									<DefaultInput
										{...field}
										ref={ref}
										error={invalid}
										helpertext={invalid ? error.message : null}
										name="person_surname"
										label="Surname"
										type="text"
										disabled
										labelProps={{ style: { color: '#000' } }}
										required
									/>
								)}
							/>
							<Controller
								control={control}
								name="person_first_name"
								render={({
									field: { ref, ...field },
									fieldState: { error, invalid },
								}) => (
									<DefaultInput
										{...field}
										ref={ref}
										error={invalid}
										helpertext={invalid ? error.message : null}
										name="person_first_name"
										label="First Name"
										type="text"
										disabled
										labelProps={{ style: { color: '#000' } }}
										required
									/>
								)}
							/>
							<Controller
								control={control}
								name="person_othernames"
								render={({
									field: { ref, ...field },
									fieldState: { error, invalid },
								}) => (
									<DefaultInput
										{...field}
										ref={ref}
										error={invalid}
										helpertext={invalid ? error.message : null}
										name="person_othernames"
										label="Othernames"
										type="text"
										disabled
										labelProps={{ style: { color: '#000' } }}
									/>
								)}
							/>
							<Controller
								control={control}
								name="person_nationality"
								render={({
									field: { ref, ...field },
									fieldState: { error, invalid },
								}) => (
									<DefaultInput
										{...field}
										ref={ref}
										error={invalid}
										helpertext={invalid ? error.message : null}
										name="person_nationality"
										label="Nationality"
										type="text"
										disabled
										labelProps={{ style: { color: '#000' } }}
									/>
								)}
							/>
							<Controller
								control={control}
								name="person_postal_address"
								render={({
									field: { ref, ...field },
									fieldState: { error, invalid },
								}) => (
									<DefaultInput
										{...field}
										ref={ref}
										error={invalid}
										helpertext={invalid ? error.message : null}
										name="person_postal_address"
										label="Postal Address"
										type="text"
										disabled={editPersonalData}
										labelProps={{ style: { color: '#000' } }}
										required
									/>
								)}
							/>
							<Controller
								control={control}
								name="person_town"
								render={({
									field: { ref, ...field },
									fieldState: { error, invalid },
								}) => (
									<DefaultInput
										{...field}
										ref={ref}
										error={invalid}
										helpertext={invalid ? error.message : null}
										name="person_town"
										label="Town"
										type="text"
										disabled
										labelProps={{ style: { color: '#000' } }}
									/>
								)}
							/>
							<Controller
								control={control}
								name="person_mobile_number"
								rules={{
									pattern: {
										value: /^(0|233|\+233)[\d]{9}$/gi,
										message: 'Please enter a valid mobile number',
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
										name="person_mobile_number"
										label="Mobile Number"
										type="tel"
										disabled={editPersonalData}
										labelProps={{ style: { color: '#000' } }}
										required
									/>
								)}
							/>
							<Controller
								control={control}
								name="person_landline"
								render={({
									field: { ref, ...field },
									fieldState: { error, invalid },
								}) => (
									<DefaultInput
										{...field}
										ref={ref}
										error={invalid}
										helpertext={invalid ? error.message : null}
										name="person_landline"
										label="Landline"
										type="tel"
										disabled
										labelProps={{ style: { color: '#000' } }}
									/>
								)}
							/>
							<Controller
								control={control}
								name="person_email"
								rules={{
									pattern: {
										value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
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
										name="person_email"
										label="Email"
										type="email"
										disabled={editPersonalData}
										labelProps={{ style: { color: '#000' } }}
										required
									/>
								)}
							/>
						</div>

						<div className="w-full flex justify-end items-center">
							{editPersonalData ? (
								<ButtonComponent
									title={
										<div className="flex justify-center items-center gap-3">
											<BiEdit className="text-base" />
											edit
										</div>
									}
									onClick={() => setEditPersonalData(false)}
									type="button"
									color="purple"
								/>
							) : (
								<ButtonComponent
									title="cancel"
									onClick={() => setEditPersonalData(true)}
									type="button"
									color="red"
								/>
							)}
						</div>
					</FormSection>

					<FormSection sectionName="employment data (add up to 3 most recent)">
						{employmentDataComponentCount !== 0
							? employmentDataFields.map((inputField) => {
									if (employmentDataComponentVisible.includes(inputField.id)) {
										return (
											<div
												key={inputField.id}
												className="relative w-full h-full flex gap-2 justify-end items-center rounded-md shadow-lg bg-gray-50 p-4 overflow-hidden">
												<div className="flex flex-col justify-center items-start md:grid place-items-center md:grid-cols-3 gap-5 mr-4 lg:mr-8 lg:gap-8 w-full">
													<Controller
														control={control}
														name={inputField.institution_name}
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
																name={inputField.institution_name}
																label={inputField.institution_name_label}
																type="text"
																required
															/>
														)}
													/>
													<Controller
														control={control}
														name={inputField.institution_type}
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
																name={inputField.institution_type}
																label={inputField.institution_type_label}
																required
																options={[
																	{
																		name: 'academia',
																		value: 'academia',
																	},
																	{
																		name: 'administration',
																		value: 'administration',
																	},
																	{
																		name: 'community',
																		value: 'community',
																	},
																	{
																		name: 'hospital',
																		value: 'hospital',
																	},
																	{
																		name: 'industry',
																		value: 'industry',
																	},
																	{
																		name: 'regulatory',
																		value: 'regulatory',
																	},
																	{
																		name: 'other',
																		value: 'other',
																	},
																]}
															/>
														)}
													/>
													<Controller
														control={control}
														name={inputField.employer_type}
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
																name={inputField.employer_type}
																label={inputField.employer_type_label}
																required
																options={[
																	{
																		name: 'government/quasi government',
																		value: 'government',
																	},
																	{
																		name: 'private',
																		value: 'private',
																	},
																	{
																		name: 'self',
																		value: 'self',
																	},
																]}
															/>
														)}
													/>
													<Controller
														control={control}
														name={inputField.position}
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
																name={inputField.position}
																label={inputField.position_label}
																type="text"
																//disabled
																labelProps={{ style: { color: '#000' } }}
																required
															/>
														)}
													/>
													<Controller
														control={control}
														name={inputField.region}
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
																name={inputField.region}
																label={inputField.region_label}
																type="text"
																//disabled
																labelProps={{ style: { color: '#000' } }}
															/>
														)}
													/>
													<Controller
														control={control}
														name={inputField.country}
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
																name={inputField.country}
																label={inputField.country_label}
																required
																options={countries}
															/>
														)}
													/>
													<div className="col-span-3 w-full flex flex-wrap md:flex-nowrap justify-center items-center gap-5">
														<Controller
															control={control}
															name={inputField.start_date}
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
																	name={inputField.start_date}
																	label={inputField.start_date_label}
																	type="date"
																	//disabled
																	labelProps={{ style: { color: '#000' } }}
																	required
																/>
															)}
														/>
														<Controller
															control={control}
															name={inputField.end_date}
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
																	name={inputField.end_date}
																	label={inputField.end_date_label}
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
														removeEmploymentDataComponent(inputField)
													}
													className="group absolute top-0 right-0 flex justify-center items-center transition-all duration-150 ease-in w-5 lg:w-6  md:hover:w-8 h-full bg-red-400 hover:shadow-lg hover:shadow-red-400/50 hover:bg-red-500 cursor-pointer">
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
									color="green"
								/>
							</div>
						) : null}
					</FormSection>

					<FormSection sectionName="support staff (add up to 10 people)">
						{supportStaffComponentCount !== 0
							? supportStaffFields.map((inputField) => {
									if (supportStaffComponentVisible.includes(inputField.id)) {
										return (
											<div
												key={inputField.id}
												className="relative w-full h-full flex gap-2 justify-end items-center rounded-md shadow-lg bg-gray-50 p-4 overflow-hidden">
												<div className="flex flex-col justify-center items-start md:grid place-items-center md:grid-cols-6 gap-5 mr-4 lg:mr-8 lg:gap-8 w-full">
													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.first_name}
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
																	name={inputField.first_name}
																	label={inputField.first_name_label}
																	type="text"
																	//disabled
																	required
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.last_name}
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
																	name={inputField.last_name}
																	label={inputField.last_name_label}
																	type="text"
																	//disabled
																	required
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.othernames}
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
																	name={inputField.othernames}
																	label={inputField.othernames_label}
																	type="text"
																	//disabled
																	required
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.dob}
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
																	name={inputField.dob}
																	label={inputField.dob_label}
																	type="date"
																	//disabled
																	required
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.phone_number}
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
																	name={inputField.phone_number}
																	label={inputField.phone_number_label}
																	type="tel"
																	//disabled
																	required
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.email}
															rules={{
																pattern: {
																	value:
																		/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
																	message: 'Please enter a valid email address',
																},
																required: 'Please enter email address',
															}}
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
																	name={inputField.email}
																	label={inputField.email_label}
																	type="email"
																	//disabled
																	required
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.practitioner_type}
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
																	name={inputField.practitioner_type}
																	label={inputField.practitioner_type_label}
																	options={[
																		{
																			name: 'pharmacy technician',
																			value: 'pt',
																		},
																		{
																			name: 'MCA',
																			value: 'mca',
																		},
																	]}
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-4">
														<Controller
															control={control}
															name={inputField.pt_pin_number}
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
																	name={inputField.pt_pin_number}
																	label={inputField.pt_pin_number_label}
																	type="text"
																	disabled={
																		watch(inputField.practitioner_type) === 'pt'
																			? false
																			: true
																	}
																	required={
																		watch(inputField.practitioner_type) === 'pt'
																			? true
																			: false
																	}
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-3">
														<Controller
															control={control}
															name={inputField.pt_year_registration}
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
																	name={inputField.pt_year_registration}
																	label={inputField.pt_year_registration_label}
																	type="text"
																	disabled={
																		watch(inputField.practitioner_type) === 'pt'
																			? false
																			: true
																	}
																	required={
																		watch(inputField.practitioner_type) === 'pt'
																			? true
																			: false
																	}
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-3">
														<Controller
															control={control}
															name={inputField.mca_education_certificate}
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
																	name={inputField.mca_education_certificate}
																	label={
																		inputField.mca_education_certificate_label
																	}
																	type="text"
																	disabled={
																		watch(inputField.practitioner_type) ===
																		'mca'
																			? false
																			: true
																	}
																	required={
																		watch(inputField.practitioner_type) ===
																		'mca'
																			? true
																			: false
																	}
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.mca_year_obtained}
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
																	name={inputField.mca_year_obtained}
																	label={inputField.mca_year_obtained_label}
																	type="text"
																	disabled={
																		watch(inputField.practitioner_type) ===
																		'mca'
																			? false
																			: true
																	}
																	required={
																		watch(inputField.practitioner_type) ===
																		'mca'
																			? true
																			: false
																	}
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.mca_certificate_upload}
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
																	name={inputField.mca_certificate_upload}
																	label={
																		inputField.mca_certificate_upload_label
																	}
																	type="file"
																	accept="application/pdf"
																	disabled={
																		watch(inputField.practitioner_type) ===
																		'mca'
																			? false
																			: true
																	}
																	required={
																		watch(inputField.practitioner_type) ===
																		'mca'
																			? true
																			: false
																	}
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={inputField.years_of_practice}
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
																	name={inputField.years_of_practice}
																	label={inputField.years_of_practice_label}
																	type="number"
																	//disabled
																/>
															)}
														/>
													</div>
												</div>

												<div
													onClick={() =>
														removeSupportStaffComponent(inputField)
													}
													className="group absolute top-0 right-0 flex justify-center items-center transition-all duration-150 ease-in w-5 lg:w-6  md:hover:w-8 h-full bg-red-400 hover:shadow-lg hover:shadow-red-400/50 hover:bg-red-500 cursor-pointer">
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

						{supportStaffComponentCount !== 10 ? (
							<div className="w-full flex justify-end items-start">
								<ButtonComponent
									type="button"
									onClick={addSupportStaffComponent}
									title="add staff"
									color="green"
								/>
							</div>
						) : null}
					</FormSection>

					<div className="flex w-full justify-end items-center gap-5">
						<ButtonComponent title="back" reset onClick={handleOpen} />
						<ButtonComponent type="submit" title="continue" />
					</div>
				</form>
			) : isLoading || isFetching ? (
				<div className="w-full h-full bg-gradient-to-b from-[#0404FF] to-blue-600 rounded-xl shadow-blue-400/30 shadow-lg flex justify-center items-center">
					<SkeletonLoad />
				</div>
			) : null}

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
	);
};

export default RelicensureForm;
