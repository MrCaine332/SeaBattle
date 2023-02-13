import React from 'react';
import styles from './Hit.module.scss'
import Icons from "../../../ui/icons/Icons";

interface IHit {
	isDestroyed: boolean
}

const Hit: React.FC<IHit> = ({ isDestroyed }) => {

	const preventClick = (e: any) => {
		e.preventDefault()
		e.stopPropagation()
	}

	return (
		<div className={styles.hit} onClick={preventClick}>
			<Icons name={isDestroyed ? 'fire' : 'close'} size={36} />
			<div className={styles.animationBoom}></div>
		</div>
	);
};

export default Hit;