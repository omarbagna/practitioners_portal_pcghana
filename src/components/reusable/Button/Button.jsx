import { Button } from '@material-tailwind/react';
import React from 'react';

const ButtonComponent = ({
	onClick,
	title,
	type,
	reset,
	color,
	text,
	width,
}) => {
	return (
		<Button
			fullWidth={width ? true : false}
			type={type}
			variant={reset ? 'outlined' : text ? 'text' : 'gradient'}
			size="md"
			color={reset ? 'red' : color ? color : 'blue'}
			onClick={onClick}>
			{title}
		</Button>
	);
};

export default ButtonComponent;
