import React from 'react';
import styles from './Ship.module.scss'

interface IShipGhost {
	size: number
}

const ShipGhost: React.FC<IShipGhost> = ({ size }) => {
	return (
		<div className={[styles.ship, styles.shipGhost, styles['size' + size]].join(' ')}>

		</div>
	);
};

export default ShipGhost;