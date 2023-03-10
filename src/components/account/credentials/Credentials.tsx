import React, {useState} from 'react';
import AppInput from "../../ui/app-input/AppInput";
import styles from './Credentials.module.scss'
import Divider from "../../ui/divider/Divider";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/redux";
import AppButton from "../../ui/button-link/app-button/AppButton";
import {IUser, IUserNullable} from "../../../app/types";
import formValidations from "../../../app/scripts/formValidations";
import AppInputWithSelect from "../../ui/app-input-with-select/AppInputWithSelect";
import authThunks from "../../../app/redux/thunks/auth-thunks";
import {useNavigate} from "react-router-dom";
import AvatarModal from "../avatar-modal/AvatarModal";
import Avatar from "../../ui/avatar/Avatar";

interface IAccountCredentials {
	sites: { id: number, name: string }[]
}


const Credentials: React.FC<IAccountCredentials> = ({ sites }) => {
	const user = useAppSelector(state => state.auth.user)
	const dispatch = useAppDispatch()

	const [showAvatars, setShowAvatars] = useState<boolean>(false)

	const [credentials, setCredentials] =
		useState<IUser & { password: string }>({...user, password: ''})

	const [validationError, setValidationError] = useState<string>("")

	const updateFields = (fields: Partial<IUser & { password: string }>) => {
		setCredentials(prevState => ({...prevState, ...fields}) )
	}

	const onSave = async () => {
		const nulledCredentials: IUserNullable = formValidations.setNulls(user, credentials)
		if (credentials.password)
			nulledCredentials.password = credentials.password

		const validationResult = formValidations.validateUpdate(credentials)
		if (typeof validationResult === "string")
			return setValidationError(validationResult)

		const result = await authThunks.update(nulledCredentials)
		if (typeof result === 'string') {
			return setValidationError(result)
		}

		if (nulledCredentials.id)
			dispatch(authThunks.fetchAndSetUser(nulledCredentials.id))
		setValidationError('')
	}

	const onCancel = () => {
		setCredentials({...user, password: ''})
	}

	const onAvatarChange = (value: string) => {
		setCredentials(prevState => ({...prevState, avatarName: value}))
	}

	const onLogout = () => {
		dispatch(authThunks.logout())
	}

	return (
		<div className={styles.credentials}>
			<div className={styles.header}>
				<h2 translate="no">???????????????????????? ????????????</h2>
				<AppButton style={"outlined"} onClick={onLogout}>??????????</AppButton>
			</div>
			<Divider />
			<div className={styles.credentialsDetails}>
				<div className={styles.inputGroup}>
					<div className={styles.row} translate="no">
						<AppInput value={credentials.lastName}
						          label={'??????????????'}
						          placeholder={'???????? ??????????????'}
						          onChange={(value) =>
							          updateFields({ lastName: value })}
						          validationFunction={formValidations.validateStringInput}
						          withResetButton
						          required
						/>
						<AppInput value={credentials.nickName}
						          label={'?????????????? ?????? (??????????????????????)'}
						          placeholder={'???????? ?????????????? ??????'}
						          onChange={(value) =>
							          updateFields({ nickName: value })}
						          validationFunction={formValidations.validateSimple}
						          withResetButton
						/>
					</div>
					<div className={styles.row} translate="no">
						<AppInput value={credentials.firstName}
						          label={'??????'}
						          placeholder={'???????? ??????'}
						          onChange={(value) =>
							          updateFields({ firstName: value })}
						          validationFunction={formValidations.validateStringInput}
						          withResetButton
						          required
						/>
						<AppInput value={credentials.middleName}
						          label={'????????????????'}
						          placeholder={'???????? ????????????????'}
						          onChange={(value) =>
							          updateFields({ middleName: value })}
						          validationFunction={formValidations.validateStringInput}
						          withResetButton
						          required
						/>
					</div>
				</div>
				<Divider direction={"vertical"} />
				<div className={styles.avatar} onClick={() => setShowAvatars(p => !p)}>
					<Avatar avatarName={credentials.avatarName} />
				</div>
			</div>
			<Divider />
			<div className={styles.credentialsDetails} translate="no">
				<div className={styles.inputGroup}>
					<div className={styles.row + ' ' + styles.inputGroupBottom}>
						<AppInput value={credentials.position}
						          label={'??????????????????'}
						          placeholder={'???????? ??????????????????'}
						          onChange={(value) =>
							          updateFields({ position: value })}
						          validationFunction={formValidations.validateStringInput}
						          withResetButton
						          required
						/>
						<AppInputWithSelect value={credentials.site}
						                    label={'??????????????????????'}
						                    placeholder={'???????? ??????????????????????'}
						                    onChange={(value) =>
							                    updateFields({ site: value })}
						                    validationFunction={formValidations.validateSimple}
						                    withResetButton
						                    required
						                    options={sites}
						/>

						<Divider direction={"vertical"} />
						<AppInput value={credentials.password}
						          label={'????????????'}
						          type={'password'}
						          placeholder={'?????????????? ????????????'}
						          onChange={(value) =>
							          updateFields({ password: value })}
						          validationFunction={formValidations.validatePassword}
						          withResetButton
						          required
						/>
					</div>
				</div>
			</div>
			<Divider />
			<div className={styles.footer} translate="no">
				<p className={styles.error} translate="no">
					{ validationError }
				</p>
				<div className={styles.credentialsButtons} translate="no">
					<AppButton style={"filled"} onClick={onSave}>??????????????????</AppButton>
					<AppButton style={"outlined"} onClick={onCancel}>????????????????</AppButton>
				</div>
			</div>
			{ showAvatars &&
                <AvatarModal onChange={onAvatarChange}
                             onClose={() => { setShowAvatars(false) }}
                /> }
		</div>
	);
};

export default Credentials;