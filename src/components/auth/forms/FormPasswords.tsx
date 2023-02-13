import React from 'react';
import styles from './Forms.module.scss'
import {IForm} from "../../../app/types";
import AppInput from "../../ui/app-input/AppInput";
import formValidations from "../../../app/scripts/formValidations";
import AppButton from "../../ui/button-link/app-button/AppButton";

interface IFormPasswords {
	registrationError?: string
}

const FormPasswords: React.FC<IForm & IFormPasswords> =
	({ credentials, updateFields, registrationError }) => {

	const confirmPassword = (value: string) => {
		if (value) {
			const validationResult = formValidations.validatePassword(value)
			if (!validationResult) {
				return false
			}
			return credentials.passwordVerification === credentials.password
		}
	}

	return (
		<>
			<AppInput value={credentials.password}
			          label={'ПАРОЛЬ'}
			          type={'password'}
			          placeholder={'Введите пароль'}
			          onChange={(value) =>
				          updateFields({ password: value })}
			          validationFunction={formValidations.validatePassword}
			          withResetButton
			          required
			/>
			<AppInput value={credentials.passwordVerification || ''}
			          label={'ПРОВЕРКА ПАРОЛЯ'}
			          type={'password'}
			          placeholder={'Повторите пароль'}
			          onChange={(value) =>
				          updateFields({ passwordVerification: value })}
			          validationFunction={confirmPassword}
			          withResetButton
			          required
			/>

			<AppButton type={"submit"} style={"filled"} className={styles.registrationButton}>
				Создать аккаунт
			</AppButton>
			{ registrationError
				? <p className={styles.registrationError}>{ registrationError }</p>
				: ''
			}
		</>
	);
};

export default FormPasswords;