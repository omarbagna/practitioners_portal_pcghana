import {
	Checkbox,
	Dialog,
	DialogFooter,
	DialogHeader,
	Typography,
} from '@material-tailwind/react';
import { FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
	ButtonComponent,
	DefaultInput,
	FormQuestion,
	FormSection,
	FormTitle,
	SelectInput,
} from '../../components';
import { useDataContext } from '../../context/DataContext';
import { epharmacyFormNoticePoints } from './data';

const EPharmacyForm = () => {
	const { relicensureData } = useDataContext();
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		//watch,
		reset,
	} = useForm({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
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
			region: relicensureData?.region === null ? '--' : relicensureData?.region,
			district:
				relicensureData?.district === null ? '--' : relicensureData?.district,
			town: relicensureData?.town === null ? '--' : relicensureData?.town,
			street: relicensureData?.street === null ? '--' : relicensureData?.street,
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

			pos_nature_of_use: '',

			pharmacist_registration_number: '',
			data_protection_certificate: '',

			delivery_service: {
				services_offered: '',
				services_provider: '',
			},

			facility_readiness: {
				bank_card_accepted: '',
				desk_computer: '',
				feature_phone: '',
				internet_access_available: '',
				mobile_money_accepted: '',
				phone_number_for_enquiries_and_orders: '',
				pos_available: '',
				presence_on_other_web_pages: '',
				smartphone: '',
				social_media_presence: '',
				standby_power_available: '',
				tablet: '',
				website: '',
			},

			payment_processing_gateway: {
				bank_debit_card: '',
				cash: '',
				cheque: '',
				mobile_money: '',
				nhis: '',
				private_insurance: '',
			},

			pharmaceutical_services: {
				in_person: '',
				phone_call: '',
				text_sms_email_whatsapp: '',
				website: '',
			},

			pos_system_usage: {
				crm: '',
				employee_management: '',
				inventory_management: '',
				payment_processing: '',
				sales_reporting: '',
				transaction_management: '',
			},

			pos_system_vendor_relationship: {
				internet_dependent: '',
				internet_not_required: '',
				vendor_name: '',
				vendor_provides_support: '',
				vendor_relationship: '',
			},

			prescriptions_processed: {
				e_prescription_submitted_digitally: '',
				physician_request_text_sms_whatsapp_email: '',
				physician_request_voice_call: '',
				written_submitted_digitally: '',
				written_submitted_in_person: '',
			},

			purchase_process: {
				email: '',
				in_person_check: '',
				phone_call: '',
				text_sms: '',
				website: '',
				whatsapp: '',
			},

			technical_proficiency: {
				attendants_understanding_of_technologies: '',
				employees_can_use_payment_processing_system: '',
				employees_can_use_pos_system: '',
				pharmacist_understanding_of_technologies: '',
			},

			terms_and_conditions_agreement: false,
		},
	});

	useEffect(() => {
		if (relicensureData === null) {
			toast.error(
				'You cannot access this page. Fill relicensure form before attempting to acces page.'
			);
			navigate('/', { replace: true });
		}
	}, [relicensureData, navigate]);

	console.log(relicensureData);

	const handleFormSubmit = (data) => {
		console.log({ data });
	};

	const handleOpen = () => setOpen(!open);
	const handleReset = () => {
		reset();
		navigate('/relicensure-application');
	};

	return (
		<div className="w-full h-full flex flex-col justify-start items-center gap-10 mt-10">
			<FormTitle title="Pharmacy Re - Licensure Application continued" />

			<div className="w-full bg-red-300/50 gap-5 text-red-600 rounded-lg p-3 flex flex-col justify-center items-start">
				<div className="w-full flex justify-start items-start gap-3">
					<div className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-2" />
					<Typography>
						Note that for pharmacies with multiple branches, each application
						applies to only one branch. Thus multiple applications are required
						for each branch.
					</Typography>
				</div>
				<div className="w-full flex justify-start items-start gap-3">
					<div className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-2" />
					<Typography>
						Please ensure you have entered a valid email address. The link to
						upload the bank pay-in slip will be sent to the email provided
					</Typography>
				</div>

				<div className="w-full flex justify-start items-start gap-3">
					<div className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-2" />
					<Typography>
						After this application, your specified superintendent Pharmacist
						will be required to give confirmation through the Pharmacists'
						Portal before payment can be made and the application processed
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
									registration, but will be required for subsequent renewal of
									the license
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
												label="Employees who can use Payment Processing System"
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
												label="Employees who can use Point of Sale System"
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
								<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
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
														name="purchase_process.in_person_check"
													/>
												}
												label="In-Person"
											/>
										)}
									/>
								</div>
								<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
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
														name="purchase_process.phone_call"
													/>
												}
												label="Phone /Voice Call"
											/>
										)}
									/>
								</div>
								<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
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
														name="purchase_process.website"
													/>
												}
												label="Website"
											/>
										)}
									/>
								</div>
								<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
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
														name="purchase_process.whatsapp"
													/>
												}
												label="WhatsApp"
											/>
										)}
									/>
								</div>
								<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
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
														name="purchase_process.text_sms"
													/>
												}
												label="Text/SMS"
											/>
										)}
									/>
								</div>
								<div className="col-span-2 lg:col-span-4 xl:col-span-3 w-full">
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
														name="purchase_process.email"
													/>
												}
												label="Email"
											/>
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
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="payment_processing_gateway.cash"
													/>
												}
												label="Cash"
											/>
										)}
									/>
								</div>
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="payment_processing_gateway.mobile_money"
													/>
												}
												label="Mobile Money"
											/>
										)}
									/>
								</div>
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="payment_processing_gateway.cheque"
													/>
												}
												label="Cheque (Repeat Customers)"
											/>
										)}
									/>
								</div>
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="payment_processing_gateway.nhis"
													/>
												}
												label="Health Insurance NHIS"
											/>
										)}
									/>
								</div>
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="payment_processing_gateway.private_insurance"
													/>
												}
												label="Private Health Insurance"
											/>
										)}
									/>
								</div>
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="payment_processing_gateway.bank_debit_card"
													/>
												}
												label="Bank Debit Card"
											/>
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
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="pharmaceutical_services.in_person"
													/>
												}
												label="In-Person"
											/>
										)}
									/>
								</div>
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="pharmaceutical_services.phone_call"
													/>
												}
												label="Phone/Voice Call"
											/>
										)}
									/>
								</div>
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="pharmaceutical_services.text_sms_email_whatsapp"
													/>
												}
												label="Text/SMS - SMS | WhatsApp | Email"
											/>
										)}
									/>
								</div>
								<div className="col-span-3 lg:col-span-6 xl:col-span-4 w-full">
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
														name="pharmaceutical_services.website"
													/>
												}
												label="Website"
											/>
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
								questionNumber="10"
								question="Types of Prescriptions Processed"
								instruction="(please select multiple options if applicable)"
							/>
							<div className="w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-8 place-items-center place-content-center">
								<div className="col-span-6 lg:col-span-6 w-full">
									<Controller
										control={control}
										name="prescriptions_processed.written_submitted_in_person"
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
														name="prescriptions_processed.physician_request_text_sms_whatsapp_email"
													/>
												}
												label="Physician Request via Text/SMS – SMS | WhatsApp | Email"
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
				</FormSection>

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

				<div className="w-full bg-red-300/50 gap-5 text-red-600 rounded-lg p-5 lg:p-8 flex flex-col justify-center items-start">
					<Typography variant="h4" className="w-full text-left">
						Submitting this form implies that
					</Typography>

					<div className="w-full flex justify-start items-start gap-3">
						<Typography variant="paragraph" className="font-medium">
							1
						</Typography>
						<Typography variant="paragraph" className="font-medium">
							You affirm that all the information provided in the form are true
							and correct to the best of your knowledge
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
									label="I agree to undertake Online Pharmacy under the terms and conditions prescribed by the Pharmacy Council"
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

export default EPharmacyForm;
