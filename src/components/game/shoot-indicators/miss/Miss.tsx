import React from 'react';
import styles from "./Miss.module.scss";

const Miss = () => {
	const preventClick = (e: any) => {
		e.preventDefault()
		e.stopPropagation()
	}

	return (
		<div className={styles.miss} onClick={preventClick}>
			<div className={styles.dot}>
			</div>
			<div className={styles.animationSplash}></div>
		</div>
	);
};

export default Miss;