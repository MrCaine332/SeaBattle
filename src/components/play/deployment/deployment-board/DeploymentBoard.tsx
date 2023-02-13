import React, {useEffect, useRef} from 'react';
import styles from './DeploymentBoard.module.scss'
import {useAppSelector} from "../../../../app/hooks/redux";
import shipDeployment from "../../../../app/scripts/shipDeploymentListeners";
import Ship from "../../../game/ship/Ship";

const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const DeploymentBoard = () => {
	const board = useAppSelector(state => state.game.board)
	const ships = useAppSelector(state => state.game.ships)

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
			{
				ships.Type4.map((ship, index) => (
					ship.placed ?
					<Ship key={index} size={4} rootY={ship.y} rootX={ship.x}
					      direction={ship.direction} placed={ship.placed}
					      style={{
						      width: '140px',
						      height: '35px',
						      position: "absolute",
						      left: 35 * ship.x + 'px',
						      top: 35 * ship.y + 'px',
						      transformOrigin: '17px 17px'
					      }}
					      className={ship.direction === 'v' ? 'shipRotated' : ''}
					/> : null
				))
			}
			{
				ships.Type3.map((ship, index) => (
					ship.placed ?
						<Ship key={index} size={3} rootY={ship.y} rootX={ship.x}
						      direction={ship.direction} placed={ship.placed}
						      style={{
							      width: '105px',
							      height: '35px',
							      position: "absolute",
							      left: 35 * ship.x + 'px',
							      top: 35 * ship.y + 'px',
							      transformOrigin: '17px 17px'
						      }}
						      className={ship.direction === 'v' ? 'shipRotated' : ''}
						/> : null
				))
			}
			{
				ships.Type2.map((ship, index) => (
					ship.placed ?
						<Ship key={index} size={2} rootY={ship.y} rootX={ship.x}
						      direction={ship.direction} placed={ship.placed}
						      style={{
							      width: '70px',
							      height: '35px',
							      position: "absolute",
							      left: 35 * ship.x + 'px',
							      top: 35 * ship.y + 'px',
							      transformOrigin: '17px 17px'
						      }}
						      className={ship.direction === 'v' ? 'shipRotated' : ''}
						/> : null
				))
			}
			{
				ships.Type1.map((ship, index) => (
					ship.placed ?
						<Ship key={index} size={1} rootY={ship.y} rootX={ship.x}
						      direction={ship.direction} placed={ship.placed}
						      style={{
							      width: '35px',
							      height: '35px',
							      position: "absolute",
							      left: 35 * ship.x + 'px',
							      top: 35 * ship.y + 'px',
							      transformOrigin: '17px 17px'
						      }}
						      className={ship.direction === 'v' ? 'shipRotated' : ''}
						/> : null
				))
			}
		</div>
	);
};

export default DeploymentBoard;