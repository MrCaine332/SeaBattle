import React from 'react';
import styles from './LeaderboardItem.module.scss'
import Divider from "../../ui/divider/Divider";
import iconFirstPlace from '../../../resources/icons/iconFirstPlace.png'
import iconSecondPlace from '../../../resources/icons/iconSecondPlace.png'
import iconThirdPlace from '../../../resources/icons/iconThirdPlace.png'
import Avatar from "../../ui/avatar/Avatar";

interface ILeaderboardItem {
	place: number
	name: string
	site: string
	total: number
	wins: number
	loses: number
	avatarName: string
}

const LeaderboardItem: React.FC<ILeaderboardItem> =
	({ place, name, site, avatarName, wins, loses, total }) => {
	return (
		<div className={styles.leaderboardItem}>
			{ (place === 1 || place === 2 || place === 3)
				? <div className={styles.place}>
					<img src={place === 1 ? iconFirstPlace
						: place === 2 ? iconSecondPlace
							: place === 3 ? iconThirdPlace : ''} alt={''} />
				</div>
				: null}
			{ (place !== 1 && place !== 2 && place !== 3)
				? <div className={styles.place}>
					<div className={styles.prize}>
						{place}
					</div>
				</div>
				: null
			}

			<Divider direction={"vertical"} />
			<div className={styles.user}>
				<div className={styles.avatar}>
					<Avatar avatarName={avatarName} />
				</div>
				<div className={styles.text + ' ' + styles.name}>
					<p translate="no">
						{ name }
					</p>
				</div>
			</div>
			<Divider direction={"vertical"} />
			<div className={styles.text + ' ' + styles.site}>
				<p translate="no">
					{ site }
				</p>
			</div>
			<Divider direction={"vertical"} />
			<div className={styles.stats}>
				<div className={styles.text + ' ' + styles.total}>
					<p translate="no">
						Всего игр: { total }
					</p>
				</div>
				<Divider direction={"vertical"} />
				<div className={styles.text + ' ' + styles.win}>
					<p translate="no">
						Побед: { wins }
					</p>
				</div>
				<Divider direction={"vertical"} />
				<div className={styles.text + ' ' + styles.lose}>
					<p translate="no">
						Поражений: { loses }
					</p>
				</div>
			</div>
		</div>
	);
};

export default LeaderboardItem;