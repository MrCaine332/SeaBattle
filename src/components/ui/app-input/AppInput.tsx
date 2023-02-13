import React, {ChangeEvent, RefObject, useEffect, useState} from 'react';
import styles from './AppInput.module.scss'
import Icons from "../icons/Icons";

export type AppInputTypes = "button" | "checkbox" | "color" |
	"date" | "datetime-local" | "email" | "file" | "hidden" |
	"image" | "month" | "number" | "password" | "radio" |
	"range" | "reset" | "search" | "submit" | "tel" |
	"text" | "time" | "url" | "week"

interface IAppInput {
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
	pattern?: string
}

const AppInput: React.FC<IAppInput> = (
	{
		value,
		type,
		name,
		id,
		placeholder,
		onChange,
		validationFunction,
		label,
		withResetButton,
		required,
		pattern,
	}) => {

	const [isError, setIsError] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)

	const validate = () => {
		if (validationFunction) {
			const isSuccess = validationFunction(value)
			if (typeof(isSuccess) === "boolean") {
				if (isSuccess)
					setIsSuccess(true)
				else setIsError(true)
			}
		}
	}

	useEffect(() => {
		validate()
	}, [])

	const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		validate()
	}

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsError(false)
		setIsSuccess(false)
		if (onChange) {
			const isSuccess = onChange(e.target.value)
			if (typeof(isSuccess) === "boolean") {
				if (isSuccess)
					setIsSuccess(true)
				else setIsError(true)
			}
		}
	}

	const onReset = () => {
		setIsError(false)
		setIsSuccess(false)
		if (onChange)
			onChange('')
	}

	return (
		<div className={styles.appInput}>
			{ label &&
                <div className={styles.label}>
					{ label }
                </div>
			}

			<div className={[styles.inputBox,
				isError ? styles.inputBox_error : '',
				isSuccess ? styles.inputBox_success : ''].join(' ')}>
				<input type={type}
				       placeholder={placeholder}
				       name={name}
				       id={id}
				       value={value}
				       onChange={onInputChange}
				       onBlur={onInputBlur}
				       required={required}
				       pattern={pattern}
				/>

				{ (withResetButton && isError)
					? <button className={styles.resetButton}
					          onClick={onReset}>
						<Icons name={'close-circle'} size={20} />
					</button>
					: null
				}

			</div>
		</div>
	);
};

export default AppInput;