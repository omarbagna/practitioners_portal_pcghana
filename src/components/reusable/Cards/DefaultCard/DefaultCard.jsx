import React from 'react';
import { Card, CardBody, CardFooter } from '@material-tailwind/react';

const DefaultCard = ({ body, footer = false }) => {
	return (
		<Card className="w-full h-fit">
			<CardBody className="w-full h-full flex flex-col gap-2 md:gap-5 justify-center items-center">
				{body}
			</CardBody>
			{footer && (
				<CardFooter divider className="flex items-center justify-between py-3">
					{footer}
				</CardFooter>
			)}
		</Card>
	);
};

export default DefaultCard;
