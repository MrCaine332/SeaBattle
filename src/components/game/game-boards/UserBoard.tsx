import React from 'react';
import styles from './Board.module.scss'
import {useAppSelector} from "../../../app/hooks/redux";
import Icons from "../../ui/icons/Icons";
import ShipGhost from "../ship/ShipGhost";
import Ship from "../ship/Ship";
import Hit from "../shoot-indicators/hit/Hit";
import Miss from "../shoot-indicators/miss/Miss";

const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const UserBoard = () => {
	const board = useAppSelector(state => state.game.board)
	const ships = useAppSelector(state => state.game.ships)

	return (
		<div>
			<div className={styles.board}>
				{
					y.map((y) => {
						return x.map((x) => (
							<div key={`${x}_${y}`}
							     className={[styles.cell,
								     (board[y][x] === 2 || board[y][x] === 3)  ? styles.cell_filled : ''].join(' ')}>

								{ (board[y][x] === 3 || board[y][x] === 4)
									? <Hit isDestroyed={board[y][x] === 4} />
									: null
								}
								{ board[y][x] === 1
									? <Miss />
									: null
								}
							</div>
						))
					})
				}
				{/*{*/}
				{/*	ships.Type4.map((ship, index) => (*/}
				{/*		<Ship key={index} size={4}*/}
				{/*		      style={{*/}
				{/*				  width: '160px',*/}
				{/*			      height: '40px',*/}
				{/*				  position: "absolute",*/}
				{/*			      left: 40 * ship.x + 'px',*/}
				{/*			      top: 40 * ship.y + 'px',*/}
				{/*			      transformOrigin: '20px 20px'*/}
				{/*		      }}*/}
				{/*		      className={ship.direction === 'v' ? 'shipRotated' : ''}*/}
				{/*		/>*/}
				{/*	))*/}
				{/*}*/}
				{/*{*/}
				{/*	ships.Type3.map((ship, index) => (*/}
				{/*		<Ship key={index} size={3}*/}
				{/*		      style={{*/}
				{/*			      width: '120px',*/}
				{/*			      height: '40px',*/}
				{/*			      position: "absolute",*/}
				{/*			      left: 40 * ship.x + 'px',*/}
				{/*			      top: 40 * ship.y + 'px',*/}
				{/*			      transformOrigin: '20px 20px'*/}
				{/*		      }}*/}
				{/*		      className={ship.direction === 'v' ? 'shipRotated' : ''}*/}
				{/*		/>*/}
				{/*	))*/}
				{/*}*/}
				{/*{*/}
				{/*	ships.Type2.map((ship, index) => (*/}
				{/*		<Ship key={index} size={2}*/}
				{/*		      style={{*/}
				{/*			      width: '80px',*/}
				{/*			      height: '40px',*/}
				{/*			      position: "absolute",*/}
				{/*			      left: 40 * ship.x + 'px',*/}
				{/*			      top: 40 * ship.y + 'px',*/}
				{/*			      transformOrigin: '20px 20px'*/}
				{/*		      }}*/}
				{/*		      className={ship.direction === 'v' ? 'shipRotated' : ''}*/}
				{/*		/>*/}
				{/*	))*/}
				{/*}*/}
				{/*{*/}
				{/*	ships.Type1.map((ship, index) => (*/}
				{/*		<Ship key={index} size={1}*/}
				{/*		      style={{*/}
				{/*			      width: '40px',*/}
				{/*			      height: '40px',*/}
				{/*			      position: "absolute",*/}
				{/*			      left: 40 * ship.x + 'px',*/}
				{/*			      top: 40 * ship.y + 'px',*/}
				{/*			      transformOrigin: '20px 20px'*/}
				{/*		      }}*/}
				{/*		      className={ship.direction === 'v' ? 'shipRotated' : ''}*/}
				{/*		/>*/}
				{/*	))*/}
				{/*}*/}
			</div>
		</div>
	);
};

export default UserBoard;