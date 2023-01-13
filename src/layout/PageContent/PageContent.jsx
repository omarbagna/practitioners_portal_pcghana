import React from 'react';
import { Outlet } from 'react-router-dom';

const PageContent = () => {
	return (
		<div className="w-full min-h-screen h-fit pt-20 lg:px-32">
			<div className="flex flex-col gap-5 w-full px-5 md:px-5 py-5 mb-16 lg:mb-8">
				<Outlet />
			</div>
		</div>
	);
};

export default PageContent;
