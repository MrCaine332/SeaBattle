import React from 'react';
import styles from './Loader.module.scss'

interface ILoader {
	className?  : string
	message?: string
}

const Loader: React.FC<ILoader> = ({ className, message }) => {
	return (
		<div className={[styles.loaderContainer, className].join(' ')}>
			<div className={styles.loader}>
			</div>
			{ message
				? <p>{ message }</p>
				: null
			}
		</div>
	);
};

export default Loader;