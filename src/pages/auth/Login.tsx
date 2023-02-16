import React, {FormEvent, useEffect, useState} from 'react';
import styles from "./Auth.module.scss";
import AuthHeader from "../../components/auth/header/AuthHeader";
import Divider from "../../components/ui/divider/Divider";
import {Link, useLocation} from "react-router-dom";
import AppInput from "../../components/ui/app-input/AppInput";
import formValidations from "../../app/scripts/formValidations";
import AppButton from "../../components/ui/button-link/app-button/AppButton";
import {useAppDispatch} from "../../app/hooks/redux";
import authThunks from "../../app/redux/thunks/auth-thunks";
import {CSSTransition} from "react-transition-group";

const Login = () => {
	const state = useLocation().state

	const [registered, setRegistered] = useState<boolean>(false)

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null
		if (state?.registered) {
			setRegistered(true)
			timeoutId = setTimeout(() => {
				setRegistered(false)
			}, 3000)
		}
		return () => {
			if (timeoutId)
				clearTimeout(timeoutId)
		}
	}, [])

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const dispatch = useAppDispatch()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		await dispatch(authThunks.login({ email, password }))
		setIsLoading(false)
	}

	return (
		<div className={styles.authContainer}>
			<CSSTransition in={registered} timeout={1000}
			               classNames={{enter: styles.registeredModal_enter,
				               enterDone: styles.registeredModal_entered}}>
				<div className={styles.registeredModal} translate="no">
					Вы успешно зарегестрировались!
				</div>
			</CSSTransition>

			<div className={styles.registration}>
				<AuthHeader pageTitle={'Вход'} />
				<form className={styles.inputs} onSubmit={onSubmit}>
					<AppInput value={email}
					          type={'email'}
					          label={'E-MAIL'}
					          placeholder={'Введите ваш E-Mail'}
					          onChange={(value) =>
						          setEmail(value)}
					          validationFunction={formValidations.validateEmail}
					          withResetButton
					          required
					/>
					<AppInput value={password}
					          type={'password'}
					          label={'ПАРОЛЬ'}
					          placeholder={'Введите пароль'}
					          onChange={(value) =>
						          setPassword(value)}
					          validationFunction={formValidations.validateStringInput}
					          withResetButton
					          required
					/>
					<AppButton type={"submit"}
					           style={"filled"}
					           className={styles.registrationButton}
					           disabled={isLoading}>
						Войти
					</AppButton>
				</form>
				<Divider />
				<p translate="no">
					Еще нет аккаунта? <Link to={'/registration'}>Создайте сейчас!</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;