import React from 'react';
import styles from './Rules.module.scss'
import Hit from "../../game/shoot-indicators/hit/Hit";
import Miss from "../../game/shoot-indicators/miss/Miss";

const Rules = () => {
	return (
		<div className={styles.rules}>
			<div className={styles.rulesItem}>
				<div className={styles.cell}>
					<Hit isDestroyed={false} />
				</div>
				Попадание
			</div>
			<div className={styles.rulesItem}>
				<div className={styles.cell}>
					<Miss />
				</div>
				Промах
			</div>
			<div className={styles.rulesItem}>
				<div className={styles.cell}>
					<Hit isDestroyed={true} />
				</div>
				Корабль уничтожен
			</div>
		</div>
	);
};

export default Rules;