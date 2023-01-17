import { AnimatePresence } from 'framer-motion';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

//import ScrollToTop from './components/scrollToTop/ScrollToTop';
import { LoadingScreen, PageLayout } from './layout';
import {
	Dashboard,
	Login,
	Error,
	RelicensureForm,
	EPharmacyForm,
	PharmacyRenewal,
} from './pages';
import PrivateRoutes from './utils/PrivateRoutes';

const App = () => {
	return (
		<AnimatePresence mode="wait">
			<Suspense fallback={<LoadingScreen />}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<PageLayout />} exact>
							{/* Dashboard Page */}
							<Route index element={<Dashboard />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route
								path="relicensure-application"
								element={<RelicensureForm />}
							/>

							<Route
								path="pharmacy-renewal-application"
								element={<PharmacyRenewal />}
							/>

							<Route
								path="pharmacy-renewal-application-continued"
								element={<EPharmacyForm />}
							/>

							{/* Error Page */}
							<Route path="*" element={<Error />} />
						</Route>
					</Route>
				</Routes>
			</Suspense>
		</AnimatePresence>
	);
};

export default App;
