
import React from 'react';
import styles from '../AppButton.module.scss'
import {Link} from "react-router-dom";


/**
 *  Usage:
 *  <AppLink style={'filled'}    // 'simple' | 'outlined' | 'filled'
 * 			   small={true}      // true | false
 * 			   href={''}         // string
 * 		       onClick={test}    // function
 * 	>
 * 	    Button
 * 	</AppLink>
 * */


type AppLink = {
	style?: 'outlined' | 'filled' | 'simple'
	small?: boolean
	href?: string
	onClick?: () => void
	className?: string
	children?: React.ReactNode
}

const AppLink: React.FC<AppLink> = (
	{
		style = 'simple',
		small,
		href = '',
		onClick,
		className = '',
		children
	}) => {

	const onLinkClick = (e: any) => {
		e.target.parentNode.blur()
		if (onClick)
			onClick()
	}

	return (
		<Link to={href} className={styles.appLink}>
			<div className={[styles.appButton,
					small ? 'button2' : 'button1',
					styles[`appButton_${style}`], className].join(' ')}
			     onClick={onClick}
			     translate={"no"}
			>
				{ children }
			</div>
		</Link>
	);
};

export default AppLink;