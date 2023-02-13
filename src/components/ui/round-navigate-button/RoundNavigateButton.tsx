import React from 'react';
import styles from './RoundNavigateButton.module.scss'
import Icons from "../icons/Icons";

interface IRoundNavigateButton {
	onClick?: (e?: any) => void
	type?: "button" | "submit" | "reset"
	className?: string
	disabled?: boolean
}

const RoundNavigateButton: React.FC<IRoundNavigateButton> = (
	{
		onClick,
		type,
		className ,
		disabled
	}) => {

	return (
		<button className={[styles.roundNavigateButton,
			disabled ? styles.roundNavigateButton_disabled : '',
			className].join(' ')}
		        disabled={disabled}
		        type={type}
		        onClick={onClick}
		>
			<Icons name={'arrow-right-simple'} size={28} />
		</button>
	);
};

export default RoundNavigateButton;