import React from 'react';
import {IForm} from "../../../app/types";
import AppInput from "../../ui/app-input/AppInput";
import formValidations from "../../../app/scripts/formValidations";
import AppInputWithSelect from "../../ui/app-input-with-select/AppInputWithSelect";

interface IFormCompany {
	sites: { id: number, name: string }[]
}

const FormCompany: React.FC<IForm & IFormCompany> = ({ credentials, updateFields, sites }) => {
	return (
		<>
			<AppInput value={credentials.position}
			          label={'ДОЛЖНОСТЬ'}
			          placeholder={'Ваша должность'}
			          onChange={(value) =>
				          updateFields({ position: value })}
			          validationFunction={formValidations.validateStringInput}
			          withResetButton
			          required
			/>
			<AppInputWithSelect value={credentials.department}
			                    label={'ПРЕДПРИЯТИЕ'}
			                    placeholder={'Ваше предприятие'}
			                    onChange={(value) =>
				                    updateFields({ department: value })}
			                    validationFunction={formValidations.validateSimple}
			                    withResetButton
			                    required
			                    options={sites}
			/>
			<AppInput value={credentials.nickname}
			          label={'ИГРОВОЕ ИМЯ (Опционально)'}
			          placeholder={'Ваше игровое имя'}
			          onChange={(value) =>
				          updateFields({ nickname: value })}
			          validationFunction={formValidations.validateSimple}
			          withResetButton
			/>
		</>
	);
};

export default FormCompany;