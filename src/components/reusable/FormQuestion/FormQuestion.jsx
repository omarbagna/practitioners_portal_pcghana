import { Typography } from '@mui/material';
import React from 'react';

const FormQuestion = ({ questionNumber, question, instruction }) => {
	return (
		<div className="w-full h-fit flex flex-col justify-center items-start gap-4">
			<Typography variant="h4" className="font-medium text-3xl capitalize">
				question {questionNumber}
			</Typography>
			<div className="flex flex-wrap justify-start items-center gap-1">
				<Typography variant="paragraph" className="text-2xl">
					{question}
				</Typography>
				<Typography variant="paragraph" className="font-extralight text-sm">
					<em>{instruction}</em>
				</Typography>
			</div>
			<div className="bg-[#8C8CFF] w-full h-1 rounded-full" />
		</div>
	);
};

export default FormQuestion;
