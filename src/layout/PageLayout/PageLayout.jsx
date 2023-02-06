import { motion } from 'framer-motion';
import React from 'react';
//import { toast } from 'react-toastify';
//import { useAuthContext } from '../../context/AuthContext';
import PageContent from '../PageContent/PageContent';
import NavBar from '../NavBar/NavBar';
import UserModal from '../UserModal/UserModal';
import Footer from '../Footer/Footer';

const PageLayout = () => {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				when: 'beforeChildren',
			},
		},
	};

	const item = {
		hidden: { opacity: 0, translateY: 100 },
		show: { opacity: 1, translateY: 0 },
	};

	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			className="bg-white flex flex-col w-screen h-screen overflow-y-scroll">
			<NavBar />

			<motion.span variants={item} className="w-full">
				<PageContent />
			</motion.span>

			<UserModal />

			<Footer />
		</motion.div>
	);
};

export default PageLayout;
