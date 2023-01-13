import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import axios from '../../api/axios';
import {
	CPDWidget,
	ElectronicPharmacyWidget,
	ErrorWidget,
	InternshipManagerWidget,
	PharmacySuperintendingWidget,
	RelicensureWidget,
	WelcomeBanner,
} from '../../components';
import { useAuthContext } from '../../context/AuthContext';
import { SkeletonLoad } from '../../layout';

const Dashboard = () => {
	const { user, logout } = useAuthContext();
	const [pharmacistData, setPharmacistData] = useState(null);

	const fetchPharmacistDetails = () => {
		return axios.get(
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
			} else if (data?.data?.status === '1') {
				setPharmacistData(data.data.data);
			}
		}
	}, [data, logout]);

	console.log(pharmacistData);

	return (
		<div className="w-full h-full flex flex-col justify-start items-center gap-10">
			<WelcomeBanner
				title={user?.title}
				firstName={user?.first_name.toLowerCase()}
				type={user?.type}
				registrationNumber={user?.registration_number}
			/>

			<div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 place-items-center gap-5">
				<div className="w-full col-span-2 lg:col-span-3">
					<CPDWidget />
				</div>
				<div className="w-full col-span-2 lg:col-span-3">
					{isLoading ? (
						<SkeletonLoad />
					) : data?.data?.status === '0' && pharmacistData === null ? (
						<ErrorWidget />
					) : (
						<RelicensureWidget pharmacistStanding={pharmacistData} />
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
