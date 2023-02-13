import React from 'react';
import styles from './Forms.module.scss'
import {IForm} from "../../../app/types";
import AppInput from "../../ui/app-input/AppInput";
import formValidations from "../../../app/scripts/formValidations";

const FormGeneral: React.FC<IForm> = ({ credentials, updateFields }) => {

	return (
		<>
			<AppInput value={credentials.email}
			          label={'E-MAIL'}
			          type={'email'}
			          placeholder={'Введите ваш E-Mail'}
			          onChange={(value) =>
				          updateFields({ email: value })}
			          validationFunction={formValidations.validateEmail}
			          withResetButton
			          required
			/>
			<AppInput value={credentials.surname}
			          label={'ФАМИЛИЯ'}
			          placeholder={'Ваша фамилия'}
			          onChange={(value) =>
				          updateFields({ surname: value })}
			          validationFunction={formValidations.validateStringInput}
			          withResetButton
			          required
			/>
			<div className={styles.inputsTwoCol}>
				<AppInput value={credentials.name}
				          label={'ИМЯ'}
				          placeholder={'Ваше имя'}
				          onChange={(value) =>
					          updateFields({ name: value })}
				          validationFunction={formValidations.validateStringInput}
				          withResetButton
				          required
				/>
				<AppInput value={credentials.patronymic}
				          label={'ОТЧЕСТВО'}
				          placeholder={'Ваше отчество'}
				          onChange={(value) =>
					          updateFields({ patronymic: value })}
				          validationFunction={formValidations.validateStringInput}
				          withResetButton
				          required
				/>
			</div>
		</>
	);
};

export default FormGeneral;