import React from 'react';
import styles from './Shipyard.module.scss'
import {useAppSelector} from "../../../../app/hooks/redux";
import Ship from "../../../game/ship/Ship";
import ShipGhost from "../../../game/ship/ShipGhost";
import Divider from "../../../ui/divider/Divider";

const Shipyard = () => {
	const ships = useAppSelector(state => state.game.ships)

	return (
		<div className={styles.shipyard}>
			<div className={styles.shipType} id={'shipType4'}>
				<Ship size={4} />
				{
					ships.Type4.map((_, index) => (
						<ShipGhost key={index} size={4} />
					))
				}
			</div>
			<Divider />
			<div className={styles.shipType} id={'shipType3'}>
				<Ship size={3} />
				<Ship size={3} />
				{
					ships.Type3.map((ship, index) => (
						<ShipGhost key={index} size={3} />
					))
				}
			</div>
			<Divider />
			<div className={styles.shipType} id={'shipType2'}>
				<Ship size={2} />
				<Ship size={2} />
				<Ship size={2} />
				{
					ships.Type2.map((ship, index) => (
						<ShipGhost key={index} size={2} />
					))
				}
			</div>
			<Divider />
			<div className={styles.shipType} id={'shipType1'}>
				<Ship size={1} />
				<Ship size={1} />
				<Ship size={1} />
				<Ship size={1} />
				{
					ships.Type1.map((ship, index) => (
						<ShipGhost key={index} size={1} />
					))
				}
			</div>
		</div>
	);
};

export default Shipyard;