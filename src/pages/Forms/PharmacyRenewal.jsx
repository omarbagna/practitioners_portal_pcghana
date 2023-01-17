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
import { useQuery } from 'react-query';
import { axiosPrivate } from '../../api/axios';
import { toast } from 'react-hot-toast';
import { SkeletonLoad } from '../../layout';
import { useDataContext } from '../../context/DataContext';
import { format } from 'date-fns';

const PharmacyRenewal = () => {
	const { user, logout } = useAuthContext();
	const {
		pharmacyData,
		setPharmacyData,
		relicensureData,
		pharmacyRenewalData,
		setPharmacyRenewalData,
		pharmacistData,
	} = useDataContext();
	const navigate = useNavigate();

	const [foundPharmacy, setFoundPharmacy] = useState(false);
	const [editFacilityData, setEditFacilityData] = useState(true);
	const [editPersonalData, setEditPersonalData] = useState(true);
	const [open, setOpen] = useState(false);
	const [applicantImage, setApplicantImage] = useState(null);
	const [searchParams, setSearchParams] = useState('');

	const currentYear = format(new Date(), 'yyyy');

	//const [file, setFile] = useState(null);

	const [supportStaffComponentCount, setSupportStaffComponentCount] =
		useState(1);
	const [supportStaffComponentVisible, setSupportStaffComponentVisible] =
		useState([1]);

	const hiddenApplicantImageInput = useRef(null);

	useEffect(() => {
		if (pharmacistData?.in_good_standing !== 'Approved') {
			toast.error('You cannot access this page. You are not in good standing.');
			navigate('/', { replace: true });
		}
	}, [pharmacistData, navigate]);

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
			is_epharmacy: '',
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
		return axiosPrivate.get(
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
		console.log(data.data);
		if (data.data.data !== false) {
			setPharmacyData(data.data.data);
			setPharmacyRenewalData(null);

			setFoundPharmacy(true);
		} else if (!data.data.data) {
			if (pharmacyRenewalData === null) {
				toast.error('Please enter a valid pharmacy license number');
				setFoundPharmacy(false);
			} else {
				setFoundPharmacy(true);
			}
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
		if (pharmacyData && pharmacyRenewalData === null) {
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
				is_epharmacy:
					pharmacyData?.is_epharmacy === null
						? '--'
						: pharmacyData?.is_epharmacy,
				last_renewal:
					pharmacyData?.last_renewal === null
						? '--'
						: pharmacyData?.last_renewal,
				cbd: pharmacyData?.cbd === null ? '--' : pharmacyData?.cbd,
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
		} else if (pharmacyData && pharmacyRenewalData && relicensureData) {
			reset({
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
					pharmacyRenewalData?.house_number === null
						? '--'
						: pharmacyRenewalData?.house_number,
				gps_address:
					pharmacyRenewalData?.ghana_post_code === null
						? '--'
						: pharmacyRenewalData?.ghana_post_code,
				phone_number:
					pharmacyRenewalData?.phone === null
						? '--'
						: pharmacyRenewalData?.phone,
				pharmacy_email:
					pharmacyRenewalData?.email === null
						? '--'
						: pharmacyRenewalData?.email,
				is_epharmacy:
					pharmacyRenewalData?.is_epharmacy === null
						? '--'
						: pharmacyRenewalData?.is_epharmacy,
				last_renewal:
					pharmacyRenewalData?.last_renewal === null
						? '--'
						: pharmacyRenewalData?.last_renewal,
				cbd:
					pharmacyRenewalData?.cbd === null ? '--' : pharmacyRenewalData?.cbd,
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
	}, [user, relicensureData, pharmacyData, pharmacyRenewalData, reset]);

	useEffect(() => {
		if (data) {
			if (data?.data?.status === '0') {
				toast.error('Session timed out, please login again to continue');
				logout();
			}
		}
	}, [data, logout]);

	//console.log(pharmacyData);

	const handleSearch = (data) => {
		setFoundPharmacy(false);
		setSearchParams(data.pharmacy_license_number);
		//refetch()
		//fetchPharmacyDetails('', data.pharmacy_license_number);
	};

	const handleFormSubmit = (data) => {
		console.log({ data });
		setPharmacyRenewalData(data);
		navigate('/pharmacy-renewal-application-continued');
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
		const index = supportStaffComponentVisible.indexOf(item);
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
			<FormTitle title="Pharmacy Renewal Application" />

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
											//disabled={editFacilityData}
											//labelProps={{ style: { color: '#000' } }}
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
											//disabled={editFacilityData}
											//labelProps={{ style: { color: '#000' } }}
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
											//disabled={editFacilityData}
											//labelProps={{ style: { color: '#000' } }}
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
											//disabled={editFacilityData}
											//labelProps={{ style: { color: '#000' } }}
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

					<FormSection sectionName="support staff (add up to a maximum 20 people)">
						{supportStaffComponentCount !== 0
							? [
									0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
									18, 19,
							  ].map((inputField) => {
									if (supportStaffComponentVisible.includes(inputField + 1)) {
										return (
											<div
												key={inputField}
												className="relative w-full h-full flex gap-2 justify-end items-center rounded-md shadow-lg bg-gray-50 p-4 overflow-hidden">
												<div className="flex flex-col justify-center items-start md:grid place-items-center md:grid-cols-6 gap-5 mr-4 lg:mr-8 lg:gap-8 w-full">
													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={`support_staff[${inputField}].first_name`}
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
																	name={`support_staff[${inputField}].first_name`}
																	label="First Name"
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
															name={`support_staff[${inputField}].last_name`}
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
																	name={`support_staff[${inputField}].last_name`}
																	label="Last Name"
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
															name={`support_staff[${inputField}].sex`}
															defaultValue=""
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
																	name={`support_staff[${inputField}].sex`}
																	label="Sex"
																	required
																	options={[
																		{
																			name: 'male',
																			value: 'male',
																		},
																		{
																			name: 'female',
																			value: 'female',
																		},
																	]}
																/>
															)}
														/>
													</div>

													<div className="w-full col-span-2">
														<Controller
															control={control}
															name={`support_staff[${inputField}].registration_number`}
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
																	name={`support_staff[${inputField}].registration_number`}
																	label="Registration Number"
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
															name={`support_staff[${inputField}].phone_number`}
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
																	name={`support_staff[${inputField}].phone_number`}
																	label="Phone Number"
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
															name={`support_staff[${inputField}].email`}
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
																	name={`support_staff[${inputField}].email`}
																	label="Email"
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
															name={`support_staff[${inputField}].type`}
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
																	name={`support_staff[${inputField}].type`}
																	label="Practitioner Type"
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
															name={`support_staff[${inputField}].pt_pin_number`}
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
																	name={`support_staff[${inputField}].pt_pin_number`}
																	label="Pin Number (Pharmacy Tech Only)"
																	type="text"
																	disabled={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'pt'
																			? false
																			: true
																	}
																	required={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'pt'
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
															name={`support_staff[${inputField}].pt_year_registration`}
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
																	name={`support_staff[${inputField}].pt_year_registration`}
																	label="Year of Registration (Pharmacy Tech Only)"
																	type="number"
																	placeholder="YYYY"
																	min="1900"
																	max={currentYear}
																	disabled={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'pt'
																			? false
																			: true
																	}
																	required={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'pt'
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
															name={`support_staff[${inputField}].mca_education_certificate`}
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
																	name={`support_staff[${inputField}].mca_education_certificate`}
																	label="Highest Educational Certificate (MCAs Only)"
																	type="text"
																	disabled={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'mca'
																			? false
																			: true
																	}
																	required={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'mca'
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
															name={`support_staff[${inputField}].mca_year_obtained`}
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
																	name={`support_staff[${inputField}].mca_year_obtained`}
																	label="Year Obtained (MCAs Only)"
																	type="text"
																	disabled={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'mca'
																			? false
																			: true
																	}
																	required={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'mca'
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
															name={`support_staff[${inputField}].mca_certificate_upload`}
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
																	name={`support_staff[${inputField}].mca_certificate_upload`}
																	label="Upload Certificate (MCAs Only)"
																	type="file"
																	accept="application/pdf"
																	disabled={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'mca'
																			? false
																			: true
																	}
																	required={
																		watch(
																			`${`support_staff[${inputField}].type`}`
																		) === 'mca'
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
															name={`support_staff[${inputField}].years_of_practice`}
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
																	name={`support_staff[${inputField}].years_of_practice`}
																	label="Years of Practice"
																	type="number"
																	required
																/>
															)}
														/>
													</div>
												</div>
												{supportStaffComponentCount !== 1 ? (
													<div
														onClick={() =>
															removeSupportStaffComponent(inputField + 1)
														}
														className="group absolute top-0 right-0 flex justify-center items-center transition-all duration-150 ease-in w-5 lg:w-6  md:hover:w-8 h-full bg-red-400 hover:shadow-lg hover:shadow-red-400/50 hover:bg-red-500 cursor-pointer">
														<Typography
															variant="paragraph"
															color="white"
															className="transition-all duration-150 ease-in tracking-widest group-hover:tracking-normal text-center text-sm uppercase rotate-90">
															remove
														</Typography>
													</div>
												) : null}
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
									color="cyan"
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

export default PharmacyRenewal;
