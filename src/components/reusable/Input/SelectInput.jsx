import React from 'react';
import { Select, Option, Typography } from '@material-tailwind/react';

const SelectInput = React.forwardRef((props, ref) => {
	const { options, onChange, value, rules, helpertext, error } = props;

	return (
		<div className="w-full">
			<Select
				{...rules}
				{...props}
				ref={ref}
				variant="outlined"
				value={value}
				size="md"
				color="blue"
				className="capitalize"
				onChange={onChange}>
				{options?.map(({ name, value }, index) => (
					<Option
						key={index}
						value={!value ? name : value}
						className="capitalize">
						{name}
					</Option>
				))}
			</Select>
			{error && helpertext && (
				<Typography className="text-xs text-red-400">{helpertext}</Typography>
			)}
		</div>
	);
});

export default SelectInput;
