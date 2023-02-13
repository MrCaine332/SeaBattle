import React, {useRef} from 'react';
import styles from './AppInputWithSelect.module.scss'
import AppInput, {AppInputTypes} from "../app-input/AppInput";
import Divider from "../divider/Divider";
import AppButton from "../button-link/app-button/AppButton";

interface IAppInputWithSelect {
	value: string
	type?: AppInputTypes
	name?: string
	id?: string
	placeholder?: string
	onChange?: (value: string) => boolean | void
	validationFunction?: (value: string) => boolean | void
	label?: string
	withResetButton?: boolean
	required?: boolean
	pattern?: string,
	options?: { id: number | string, name: string }[]
}

const AppInputWithSelect: React.FC<IAppInputWithSelect> = (
	{
		value,
		type,
		id,
		placeholder,
		onChange,
		validationFunction,
		label,
		withResetButton,
		required,
		pattern,
		options
	}) => {

	const onInputChange = (value: string) => {
		if (onChange)
			onChange(value)
	}

	const onOptionClick = (value: string) => {
		if (onChange)
			onChange(value)
	}

	return (
		<div className={styles.inputWithSelect} id={id}>
			<AppInput value={value}
			          label={label}
			          type={type}
			          placeholder={placeholder}
			          onChange={onInputChange}
			          withResetButton={withResetButton}
			          validationFunction={validationFunction}
			          required={required}
			          pattern={pattern}
			/>

			<div className={styles.selectList}>
				{ options && options.map((option, index) => (
					<div key={option.id} onClick={() => onOptionClick(option.name)}>
						{ index !== 0 && <Divider />}
						<AppButton type={"button"} className={styles.option}>
							{ option.name }
						</AppButton>
					</div>
				)) }
			</div>
		</div>
	);
};

export default AppInputWithSelect;