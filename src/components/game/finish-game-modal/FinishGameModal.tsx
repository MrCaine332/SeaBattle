import React from 'react';
import styles from './FinishGameModal.module.scss'
import {useAppDispatch} from "../../../app/hooks/redux";
import winImage from '../../../resources/winImage.png'
import loseImage from '../../../resources/loseImage.png'
import AppButton from "../../ui/button-link/app-button/AppButton";
import iconPort from "../../../resources/icons/iconPort.png";
import gameThunks from "../../../app/redux/thunks/game-thunks";

interface IFinishGameModal {
	didUserWon: boolean
}

const FinishGameModal: React.FC<IFinishGameModal> = ({ didUserWon }) => {

	const dispatch = useAppDispatch()

	const onExit = () => {
		dispatch(gameThunks.resetGameState())
	}

	return (
		<div className={styles.finishGameModal}>
			<div className={styles.modalBackground}></div>
			<div className={styles.modalBody}>
				<div className={styles.image}>
					<img src={didUserWon ? winImage : loseImage} alt=""/>
				</div>
				<div className={styles.info}>
					<div className={[styles.text,
						didUserWon ? styles.textWin : styles.textLose].join(' ')}>
						{ didUserWon
							? <>
								<p>Поздравляем, вы победили!</p>
								<p>Великолепное сражение, адмирал!</p>
							</>
							:  <>
								<p>Бой проигран, адмирал.</p>
								<p>Но следующее сражение будет за Вами!</p>
							</>
						}
					</div>
					<AppButton style={"outlined"}
					           className={styles.backButton}
					           onClick={onExit}
					>
						Вернуться в доки <img src={iconPort} alt={''} />
					</AppButton>
				</div>
			</div>
		</div>
	);
};

export default FinishGameModal;