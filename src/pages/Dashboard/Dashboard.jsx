import axios from 'axios';
import { format } from 'date-fns';
import React, {
	useEffect,
	useState,
	//, useState
} from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { axiosPrivate } from '../../api/axios';
import {
	CPDWidget,
	DigitalizationWidget,
	ErrorWidget,
	InternshipManagerWidget,
	PharmacyRenewalWidget,
	ViewInvoiceWidget,
	PharmacySuperintendingWidget,
	RelicensureWidget,
	WelcomeBanner,
	ButtonComponent,
} from '../../components';
import { useAuthContext } from '../../context/AuthContext';
import { useDataContext } from '../../context/DataContext';
import { useStateContext } from '../../context/StateContext';
import { InvoiceModal, SkeletonLoad, ViewInvoiceButton } from '../../layout';
import { Typography } from '@mui/material';

const Dashboard = () => {
	const currentYear = format(new Date(), 'yyyy');
	const { user, logout } = useAuthContext();
	const { setLoadingInvoice } = useStateContext();
	const [loadingPharmacistStatus, setLoadingPharmacistStatus] = useState(false);
	//const [pharmacistStatus, setPharmacistStatus] = useState(null);
	const [loadingPharmacyStatus, setLoadingPharmacyStatus] = useState(false);
	const [pharmacyStatus, setPharmacyStatus] = useState(null);
	const [psghStatus, setPsghStatus] = useState(null);
	const {
		setPharmacyRenewalStatus,
		setInvoiceData,
		pharmacistData,
		setPharmacistData,
		cpdData,
		setCpdData,
	} = useDataContext();

	const fetchPharmacistDetails = () => {
		return axiosPrivate.get(
			`api_pharmacist/getPharmacistDetailsByRegNum?r=${user?.registration_number}`,
			{
				headers: { Token: user?.token, Userid: user?.id, Type: user?.type },
			}
		);
	};

	const fetchPharmacistCPDScore = () => {
		return axiosPrivate.get(
			`api/getCpdScore?r=${user?.registration_number}&year=${currentYear - 1}`,
			{
				headers: { Token: user?.token, Userid: user?.id, Type: user?.type },
			}
		);
	};

	const { data, isLoading, isError } = useQuery(
		'pharmacist_details',
		fetchPharmacistDetails
	);

	//console.log(isError);

	const pharmacist_cpd_score = useQuery(
		'pharmacist_cpd_score',
		fetchPharmacistCPDScore
	);

	const fetchPharmacistPSGHStanding = () => {
		const registrationNumber = user?.registration_number.split(' ');
		const psgh_number = registrationNumber[1];
		return axios.post(
			'https://goldenministersfellowship.org/pcghana-api/',
			JSON.stringify({
				method: 'GET_PSGH_MEMBER_STATUS',
				api_key: '42353d5c33b45b0a8246b9bf0cd46820e516e3e4',
				registration_number: psgh_number,
			}),
			{
				headers: { 'Content-Type': 'application/json' },
				//withCredentials: true,
			}
		);
	};

	const psgh_standing = useQuery('psgh_standing', fetchPharmacistPSGHStanding);

	console.log(psgh_standing?.data);

	useEffect(() => {
		if (data && psgh_standing?.data) {
			if (data?.data?.status === '0') {
				toast.error('Session timed out, please login again to continue');
				logout();
			} else if (
				data?.data?.status === '1' &&
				psgh_standing?.data?.data?.error === false
			) {
				console.log(psgh_standing?.data?.data);
				setPsghStatus(psgh_standing?.data?.data);
			}
		}
	}, [data, logout, psgh_standing]);

	const goToPSGH = () => {
		window.open('https://psgh.societymanager.org/clients/login', '_blank');
	};

	useEffect(() => {
		if (data && pharmacist_cpd_score?.data) {
			if (
				data?.data?.status === '0' ||
				pharmacist_cpd_score?.data?.data?.status === '0'
			) {
				toast.error('Session timed out, please login again to continue');
				logout();
			} else if (
				data?.data?.status === '1' &&
				pharmacist_cpd_score?.data?.data?.status === '1'
			) {
				//console.log(data?.data?.data);
				//console.log(pharmacist_cpd_score?.data?.data);
				setCpdData(pharmacist_cpd_score?.data?.data);
				setPharmacistData(data.data.data);
			}
		}
	}, [data, logout, setPharmacistData, setCpdData, pharmacist_cpd_score]);

	useEffect(() => {
		const getInvoices = async () => {
			setLoadingInvoice(true);
			try {
				const response = await axios.post(
					'https://goldenministersfellowship.org/pcghana-api/',
					JSON.stringify({
						method: 'GET_PC_INVOICES',
						api_key: '42353d5c33b45b0a8246b9bf0cd46820e516e3e4',
						license_no: user?.registration_number,
					}),
					{
						headers: { 'Content-Type': 'application/json' },
						//withCredentials: true,
					}
				);

				//console.log(response.data);

				setInvoiceData(response.data);
				setLoadingInvoice(false);
			} catch (error) {
				console.log(error);
				let errorMessage;
				if (error.response?.status === 400) {
					errorMessage = 'Server Error';
					console.log(errorMessage);
				}
			}
			setLoadingInvoice(false);
		};

		const getPharmacistApplicationStatus = async () => {
			setLoadingPharmacistStatus(true);
			try {
				const response = await axios.post(
					'https://goldenministersfellowship.org/pcghana-api/',
					JSON.stringify({
						method: 'GET_APPLICATION_STATUS',
						api_key: '42353d5c33b45b0a8246b9bf0cd46820e516e3e4',
						registration_number: user?.registration_number,
						renewal_type: 'pharmacist_renewal',
					}),
					{
						headers: { 'Content-Type': 'application/json' },
						//withCredentials: true,
					}
				);

				//console.log(response.data);
				if (response.data !== null) {
					//console.log(response.data);
					//setPharmacistStatus(response.data);
					setLoadingPharmacistStatus(false);
				} else {
					setLoadingPharmacistStatus(false);
					return;
				}
			} catch (error) {
				console.log(error);
				let errorMessage;
				if (error.response?.status === 400) {
					errorMessage = 'Server Error';
					console.log(errorMessage);
				}
			}
			setLoadingPharmacistStatus(false);
		};

		const getPharmacyApplicationStatus = async () => {
			setLoadingPharmacistStatus(true);
			try {
				const response = await axios.post(
					'https://goldenministersfellowship.org/pcghana-api/',
					JSON.stringify({
						method: 'GET_APPLICATION_STATUS',
						api_key: '42353d5c33b45b0a8246b9bf0cd46820e516e3e4',
						registration_number: user?.registration_number,
						renewal_type: 'pharmacy_renewal',
					}),
					{
						headers: { 'Content-Type': 'application/json' },
						//withCredentials: true,
					}
				);

				//console.log(response.data);
				if (response.data !== null) {
					//console.log(response.data);
					setPharmacyStatus(response.data);
					setPharmacyRenewalStatus(response.data);
					setLoadingPharmacyStatus(false);
				} else {
					setLoadingPharmacyStatus(false);
					return;
				}
			} catch (error) {
				console.log(error);
				let errorMessage;
				if (error.response?.status === 400) {
					errorMessage = 'Server Error';
					console.log(errorMessage);
				}
			}
			setLoadingPharmacyStatus(false);
		};

		getInvoices();
		getPharmacistApplicationStatus();
		getPharmacyApplicationStatus();
	}, [user, setInvoiceData, setLoadingInvoice, setPharmacyRenewalStatus]);

	return (
		<div className="w-full h-full flex flex-col justify-start items-center gap-10">
			<WelcomeBanner
				title={user?.title?.toLowerCase()}
				firstName={user?.first_name.toLowerCase()}
				type={user?.type}
				registrationNumber={user?.registration_number}
			/>

			{psgh_standing.isLoading || psgh_standing.isFetching ? (
				<SkeletonLoad />
			) : psghStatus !== null && psghStatus?.status === false ? (
				<div className="w-full h-full flex justify-center items-center">
					<div className="transition-all duration-150 ease-in-out w-fit h-fit flex flex-col justify-center items-center gap-5 rounded-md overflow-hidden p-5 bg-red-400 shadow-md shadow-red-400/20 hover:shadow-lg hover:shadow-red-400/50">
						<Typography
							variant="h3"
							color="black"
							className="text-center text-xl md:text-2xl lg:text-3xl">
							You are not in good standing with the Pharmaceutical Society of
							Ghana (PSGH)
						</Typography>
						<Typography
							variant="paragraph"
							color="white"
							className="text-center text-lg">
							Click the button below to resolve status with PSGH
						</Typography>
						<ButtonComponent
							onClick={goToPSGH}
							width
							title="go to psgh"
							color="cyan"
						/>
					</div>
				</div>
			) : (
				<div className="w-full h-full flex flex-col justify-start items-center gap-10">
					<InvoiceModal />

					<ViewInvoiceButton />

					<div className="w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 place-items-center gap-5">
						<div className="w-full col-span-2">
							{isLoading ? (
								<SkeletonLoad />
							) : (pharmacist_cpd_score?.data?.data?.status === '0' &&
									cpdData === null) ||
							  pharmacist_cpd_score.isError ? (
								<ErrorWidget />
							) : (
								<CPDWidget cpdDATA={cpdData} year={currentYear - 1} />
							)}
						</div>

						<div className="w-full col-span-2 ">
							{isLoading || loadingPharmacistStatus ? (
								<SkeletonLoad />
							) : (data?.data?.status === '0' && pharmacistData === null) ||
							  isError ? (
								<ErrorWidget />
							) : (
								<RelicensureWidget pharmacistStanding={pharmacistData} />
							)}
						</div>

						<div className="w-full col-span-2">
							{isLoading || loadingPharmacyStatus ? (
								<SkeletonLoad />
							) : data?.data?.status === '0' && pharmacistData === null ? (
								<ErrorWidget />
							) : (
								<PharmacyRenewalWidget
									pharmacistStanding={pharmacistData}
									pharmacyRenewalStatus={pharmacyStatus}
								/>
							)}
						</div>
						<div className="w-full col-span-2">
							<PharmacySuperintendingWidget />
						</div>
						<div className="w-full col-span-2">
							{isLoading || loadingPharmacyStatus ? (
								<SkeletonLoad />
							) : data?.data?.status === '0' && pharmacistData === null ? (
								<ErrorWidget />
							) : (
								<DigitalizationWidget
									pharmacistStanding={pharmacistData}
									pharmacyRenewalStatus={pharmacyStatus}
								/>
							)}
						</div>
						<div className="w-full col-span-2">
							<ViewInvoiceWidget />
						</div>
						<div className="w-full col-span-2">
							<InternshipManagerWidget />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
