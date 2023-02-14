import React from 'react';
import styles from './Hit.module.scss'
import Icons from "../../../ui/icons/Icons";
import fireSvg from '../../../../resources/icons/fire.svg'

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
			{ isDestroyed
				? <img src={fireSvg} alt={''} />
				: <Icons name={'close'} size={36} />
			}
			<div className={styles.animationBoom}></div>
		</div>
	);
};

export default Hit;