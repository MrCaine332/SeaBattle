import React, {useEffect, useRef} from 'react';
import styles from './DeploymentBoard.module.scss'
import {useAppSelector} from "../../../../app/hooks/redux";
import shipDeployment from "../../../../app/scripts/shipDeploymentListeners";

const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const DeploymentBoard = () => {
	const board = useAppSelector(state => state.game.board)

	return (
		<div className={styles.deploymentBoard}
		     id={'board'}
		     onMouseLeave={shipDeployment.onBoardMouseLeave}>
			{
				y.map((y) => {
					return x.map((x) => (
						<div key={`${x}_${y}`}
						     data-x={x} data-y={y} data-filled={board[y][x] === 2}
						     id={'cell'}
						     onMouseEnter={shipDeployment.onCellMouseEnter}
						     className={styles.cell} />
					))
				})
			}
			<div className={[styles.shipTemplate, styles['size1']].join(' ')} id={'shipTemplate1'}></div>
			<div className={[styles.shipTemplate, styles['size2']].join(' ')} id={'shipTemplate2'}></div>
			<div className={[styles.shipTemplate, styles['size3']].join(' ')} id={'shipTemplate3'}></div>
			<div className={[styles.shipTemplate, styles['size4']].join(' ')} id={'shipTemplate4'}></div>
		</div>
	);
};

export default DeploymentBoard;