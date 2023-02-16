import React, {FormEvent, useEffect, useState} from 'react';
import styles from './Auth.module.scss'
import {useMultistepForm} from "../../app/hooks/useMultistepForm";
import RoundNavigateButton from "../../components/ui/round-navigate-button/RoundNavigateButton";
import {ICredentials} from "../../app/types";
import formValidations from "../../app/scripts/formValidations";
import authThunks from "../../app/redux/thunks/auth-thunks";
import FormGeneral from "../../components/auth/forms/FormGeneral";
import FormCompany from "../../components/auth/forms/FormCompany";
import FormPasswords from "../../components/auth/forms/FormPasswords";
import AuthHeader from "../../components/auth/header/AuthHeader";
import {Link, useNavigate} from "react-router-dom";
import Divider from "../../components/ui/divider/Divider";

const Registration = () => {
	const [credentials, setCredentials] = useState<ICredentials>(
		{email: "", name: "", patronymic: "", surname: "", nickname: "",
			position: "", department: "", password: "", passwordVerification: ""})

	const [validationError, setValidationError] = useState<string>("")

	const [sites, setSites] = useState<{ id: number, name: string }[]>([])

	const getSites = async () => {
		const sites = await authThunks.getSites()
		setSites(sites)
	}

	useEffect(() => {
		getSites()
	}, [])

	const updateFields = (fields: Partial<ICredentials>) => {
		setCredentials(prevState => ({...prevState, ...fields}) )
	}

	const formSteps = [
		<FormGeneral credentials={credentials} updateFields={updateFields} />,
		<FormCompany credentials={credentials} updateFields={updateFields} sites={sites} />,
		<FormPasswords credentials={credentials}
		               updateFields={updateFields}
		               registrationError={validationError} />
	]

	const { steps, currentStepIndex, step,
		next, back, isFirstStep, isLastStep } = useMultistepForm(formSteps)

	const navigate = useNavigate()

	const onRegistration = async () => {
		const validationResult = formValidations.validateRegistration(credentials)

		if (typeof validationResult === "string")
			return setValidationError(validationResult)

		const result = await authThunks.register(credentials)
		if (typeof result === 'string') {
			return setValidationError(result)
		}

		setValidationError('')
		navigate('/login', { state: { registered: true } })
	}

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (!isLastStep)
			return next()
		onRegistration()
	}

	return (
		<div className={styles.authContainer}>
			<div className={styles.registration}>
				<AuthHeader pageTitle={'Регистрация'} />
				<form className={styles.inputs} onSubmit={onSubmit}>

					{ step }

					<div className={styles.formControls}>
						<div className={styles.pageNumber}>
							Страница { currentStepIndex + 1 } / { steps.length }
						</div>

						<div className={styles.formNavigateButtons}>
							<RoundNavigateButton className={styles.buttonRotated}
							                     type={"button"}
							                     onClick={back}
							                     disabled={isFirstStep}
							/>
							<RoundNavigateButton disabled={isLastStep} />
						</div>
					</div>
				</form>
				<Divider />
				<p translate="no">
					У вас уже есть аккаунт? <Link to={'/login'}>Войти!</Link>
				</p>
			</div>
		</div>
	);
};

export default Registration;