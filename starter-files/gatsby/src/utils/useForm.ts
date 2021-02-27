import React, { useState } from 'react';
import { UseFormObject } from '../interfaces/UseFormObject';

export default function useForm(defaults: UseFormObject) {
	const [values, setValues] = useState(defaults);

	function updateValue(e: React.ChangeEvent<HTMLInputElement>) {
		// check if its a number and convert
		let value: string | number = e.target.value;
		if (e.target.type === 'number') {
			value = parseInt(value);
		}
		setValues({
			// copy the exisiting values into it
			...values,
			// update the new value that changed
			[e.target.name]: e.target.value,
		});
	}

	return { values, updateValue };
}
