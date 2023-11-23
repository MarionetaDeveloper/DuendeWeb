import React from 'react';
import './InputText.style.css';

function InputText(props) {
	const { labelText, inputClassname, typeInput, idInput, inputName, value, onChange  } =
		props;

	return (
		<div className={inputClassname}>
			<label htmlFor={idInput}>{labelText}</label>
			<input type={typeInput} id={idInput} name={inputName} value={value} onChange={onChange} />
		</div>
	);
}

export default InputText;
