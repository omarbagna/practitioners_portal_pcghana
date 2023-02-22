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
	disabled,
}) => {
	return (
		<Button
			fullWidth={width ? true : false}
			disabled={disabled ? true : false}
			type={type}
			variant={reset ? 'outlined' : text ? 'text' : 'gradient'}
			size="md"
			color={reset ? 'red' : color ? color : 'blue'}
			className="flex justify-center items-center gap-4"
			onClick={onClick}>
			{title}
		</Button>
	);
};

export default ButtonComponent;
