import React from 'react';
import styles from '../AppButton.module.scss'

/**
 *  Usage:
 *  <AppButton style={'filled'}    // 'simple' | 'outlined' | 'filled'
 * 			   small={true}        // true | false
 * 			   type={'button'}     // 'button' | 'submit' | 'reset'
 * 			   disabled={true}     // true | false
 * 			   name={''}           // string
 * 			   value={''}          // string
 * 		       onClick={test}      // function
 * 	>
 * 	    Button
 * 	</AppButton>
 * */

type AppButton = {
	style?: 'outlined' | 'filled' | 'simple'
	type?: 'submit' | 'reset' | 'button'
	disabled?: boolean
	name?: string
	value?: string
	onClick?: () => void
	className?: string
	children?: React.ReactNode
}

const AppButton: React.FC<AppButton> = (
	{
		style = 'simple',
		type,
		disabled,
		name,
		value,
		onClick,
		className= '',
		children
	}) => {

	// const ref = useRef<HTMLButtonElement>(null)
	// useEffect(() => {
	// 	const listener = (e: any) => {
	// 		e.preventDefault()
	// 	}
	// 	ref.current?.addEventListener('mousedown', listener)
	// 	return () => ref.current?.removeEventListener('mousedown', listener)
	// }, [])

	return (
		<button className={[styles.appButton,
			styles[`appButton_${style}`],
			className].join(' ')}
		        type={type}
		        disabled={disabled}
		        name={name}
		        value={value}
		        onClick={onClick}
		        // ref={ref}
		        translate={"no"}
		>
			{ children }
		</button>
	);
};

export default AppButton;