import React from 'react';
import styles from './ShowTurn.module.scss'
import Icons from "../../ui/icons/Icons";
import AppButton from "../../ui/button-link/app-button/AppButton";
import iconWhiteFlag from '../../../resources/icons/iconWhiteFlag.png'
import iconPort from "../../../resources/icons/iconPort.png";

interface IShowTurn {
	turn: boolean
	timeLeft: number
	onSurrender: () => void
}

const ShowTurn: React.FC<IShowTurn> = ({ turn, timeLeft, onSurrender }) => {
	return (
		<div className={styles.showTurn}>
			<div className={styles.timer}>
				<h1>
					{ timeLeft }
				</h1>
			</div>
			<div className={styles.turn}>
				<p className={turn ? styles.userTurnText : styles.opponentTurnText}>
					{ turn
						? <>Ваш ход</>
						: <>Ход оппонента</> }
					{/*<Timer turn={turn} toggle={toggle} connection={connection} />*/}
				</p>
				<div className={[styles.arrow, turn ? styles.userTurnArrow : styles.opponentTurnArrow].join(' ')}>
					<Icons name={'arrow-right-simple'} size={48} />
				</div>
			</div>
			<AppButton style={"outlined"} className={styles.surrenderButton} onClick={onSurrender}>
				Сбежать <img src={iconWhiteFlag} alt={''} />
			</AppButton>
		</div>
	);
};

export default ShowTurn;