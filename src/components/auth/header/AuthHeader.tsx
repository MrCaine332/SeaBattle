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
				<h2 translate="no">Морской бой</h2>
			</div>
			{ pageTitle
				? <>
					<Divider />
					<h3 translate="no" className={styles.pageTitle}>{ pageTitle }</h3>
				</>
				: ''
			}
		</div>
	);
};

export default AuthHeader;