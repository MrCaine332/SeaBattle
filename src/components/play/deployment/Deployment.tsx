import React, {useEffect} from 'react';
import styles from './Deployment.module.scss'
import shipDeployment from "../../../app/scripts/shipDeploymentListeners";
import {useAppSelector} from "../../../app/hooks/redux";
import Shipyard from "./shipyard/Shipyard";
import DeploymentBoard from "./deployment-board/DeploymentBoard";

const Deployment = () => {
	const ships = useAppSelector(state => state.game.ships)

	useEffect(() => {
		shipDeployment.placeShipsOnPageLoaded(ships)
	}, [])

	return (
		<div className={styles.deployment}>
			<Shipyard />
			<DeploymentBoard />
		</div>
	);
};

export default Deployment;