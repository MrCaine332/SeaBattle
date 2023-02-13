import React from 'react';
import styles from './AuthHeader.module.scss'
import Divider from "../../ui/divider/Divider";

interface IAuthHeader {
	pageTitle?: string
}

const AuthHeader: React.FC<IAuthHeader> = ({ pageTitle }) => {
	return (
		<div className={styles.authHeader}>
			<div className={styles.headerRow}>
				{/*<div className={styles.logo}>*/}

				{/*</div>*/}
				<h2>Морской бой</h2>
			</div>
			{ pageTitle
				? <>
					<Divider />
					<h3 className={styles.pageTitle}>{ pageTitle }</h3>
				</>
				: ''
			}
		</div>
	);
};

export default AuthHeader;