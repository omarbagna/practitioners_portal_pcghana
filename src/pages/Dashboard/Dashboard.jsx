import axios from 'axios';
import { format } from 'date-fns';
import React, {
	useEffect,
	//, useState
} from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { axiosPrivate } from '../../api/axios';
import {
	CPDWidget,
	ElectronicPharmacyWidget,
	ErrorWidget,
	InternshipManagerWidget,
	PharmacyRenewalWidget,
	PharmacySuperintendingWidget,
	RelicensureWidget,
	WelcomeBanner,
} from '../../components';
import { useAuthContext } from '../../context/AuthContext';
import { useDataContext } from '../../context/DataContext';
import { useStateContext } from '../../context/StateContext';
import { InvoiceModal, SkeletonLoad, ViewInvoiceButton } from '../../layout';

const Dashboard = () => {
	const currentYear = format(new Date(), 'yyyy');
	const { user, logout } = useAuthContext();
	const { setLoadingInvoice } = useStateContext();
	const {
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
			`api/getCpdScore?r=${user?.registration_number}?Year=${currentYear - 1}`,
			{
				headers: { Token: user?.token, Userid: user?.id, Type: user?.type },
			}
		);
	};

	const { data, isLoading } = useQuery(
		'pharmacist_details',
		fetchPharmacistDetails
	);

	const pharmacist_cpd_score = useQuery(
		'pharmacist_cpd_score',
		fetchPharmacistCPDScore
	);

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
				console.log(pharmacist_cpd_score?.data?.data);
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
					'/pcghana-api/',
					JSON.stringify({
						method: 'GET_PC_INVOICES',
						api_key: '42353d5c33b45b0a8246b9bf0cd46820e516e3e4',
						license_no: user?.registration_number,
					}),
					{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true,
					}
				);

				//console.log(response.data);
				if (response.data !== null) {
					//console.log(response.data);
					setInvoiceData(response.data);
					setLoadingInvoice(false);
				} else {
					setLoadingInvoice(false);
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
			setLoadingInvoice(false);
		};

		getInvoices();
	}, [user, setInvoiceData, setLoadingInvoice]);

	return (
		<div className="w-full h-full flex flex-col justify-start items-center gap-10">
			<WelcomeBanner
				title={user?.title}
				firstName={user?.first_name.toLowerCase()}
				type={user?.type}
				registrationNumber={user?.registration_number}
			/>

			<InvoiceModal />

			<ViewInvoiceButton />

			<div className="w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 place-items-center gap-5">
				<div className="w-full col-span-2">
					{isLoading ? (
						<SkeletonLoad />
					) : data?.data?.status === '0' && cpdData === null ? (
						<ErrorWidget />
					) : (
						<CPDWidget cpdDATA={cpdData} year={currentYear - 1} />
					)}
				</div>

				<div className="w-full col-span-2 ">
					{isLoading ? (
						<SkeletonLoad />
					) : data?.data?.status === '0' && pharmacistData === null ? (
						<ErrorWidget />
					) : (
						<RelicensureWidget pharmacistStanding={pharmacistData} />
					)}
				</div>

				<div className="w-full col-span-2">
					{isLoading ? (
						<SkeletonLoad />
					) : data?.data?.status === '0' && pharmacistData === null ? (
						<ErrorWidget />
					) : (
						<PharmacyRenewalWidget pharmacistStanding={pharmacistData} />
					)}
				</div>
				<div className="w-full col-span-2">
					<PharmacySuperintendingWidget />
				</div>
				<div className="w-full col-span-2">
					<ElectronicPharmacyWidget />
				</div>
				<div className="w-full col-span-2">
					<InternshipManagerWidget />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
