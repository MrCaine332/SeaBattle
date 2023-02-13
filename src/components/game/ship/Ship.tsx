import React from 'react';
import styles from './Ship.module.scss'
import shipDeployment from '../../../app/scripts/shipDeploymentListeners'
import ship4 from '../../../resources/ships/ship4.png'
import ship3 from '../../../resources/ships/ship3.png'
import ship2 from '../../../resources/ships/ship2.png'
import ship1 from '../../../resources/ships/ship1.png'

interface IShip {
	size: number
	style?: React.CSSProperties
	className?: string
}

const Ship: React.FC<IShip> = ({ size, style, className }) => {

	return (
		<div className={[styles.ship, styles['size' + size], className].join(' ')}
		     data-size={size}
		     data-placed={false}
		     data-direction={'h'}
		     id={'ship'}
		     style={style}
		     onMouseDown={shipDeployment.onShipMouseDown}
		>
			{ size === 1 ? <img src={ship1} alt={''} /> : null }
			{ size === 2 ? <img src={ship2} alt={''} /> : null }
			{ size === 3 ? <img src={ship3} alt={''} /> : null }
			{ size === 4 ? <img src={ship4} alt={''} /> : null }
			{/*<img src={ship4} />*/}
		</div>
	);
};

export default Ship;