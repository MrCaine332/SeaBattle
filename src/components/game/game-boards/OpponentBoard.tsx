import React from 'react';
import styles from './Board.module.scss'
import {useAppSelector} from "../../../app/hooks/redux";
import Icons from "../../ui/icons/Icons";
import Hit from "../shoot-indicators/hit/Hit";
import Miss from "../shoot-indicators/miss/Miss";

const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

interface IOpponentBoard {
	shoot: (row: number, col: number) => void
}

const OpponentBoard: React.FC<IOpponentBoard> = ({ shoot }) => {
	const opponentBoard = useAppSelector(state => state.game.opponentBoard)

	const onCellClick = (y: number, x: number) => {
		if (opponentBoard[y][x] !== 1 && opponentBoard[y][x] !== 3 ) {
			shoot(y, x)
		}
	}

	return (
		<div>
			<div className={styles.board}>
				{
					y.map((y) => {
						return x.map((x) => (
							<div key={`${x}_${y}`} data-x={x} data-y={y}
							     className={[styles.cell, styles.opponentCell].join(' ')}
							     onClick={() => onCellClick(y, x)}>

								{ (opponentBoard[y][x] === 3 || opponentBoard[y][x] === 4)
									? <Hit isDestroyed={opponentBoard[y][x] === 4} />
									: null
								}
								{ opponentBoard[y][x] === 1
									? <Miss />
									: null
								}
							</div>
						))
					})
				}
			</div>
		</div>
	);
};

export default OpponentBoard;