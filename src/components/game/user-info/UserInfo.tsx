import React, {memo} from 'react';
import styles from './UserInfo.module.scss'
import avatar11 from '../../../resources/avatar11.jpg'
import avatar12 from '../../../resources/avatar12.jpg'
import {useAppSelector} from "../../../app/hooks/redux";
import Avatar from "../../ui/avatar/Avatar";

interface IUserInfo {
	userType?: 'player' | 'opponent'
	name?: string
	avatarName?: string
}

const UserInfo: React.FC<IUserInfo> = memo(({ userType = 'player', name, avatarName }) => {

	return (
		<div className={[styles.userInfo,
			userType === 'player' ? styles.userInfo_left : '',
			userType === 'opponent' ? styles.userInfo_right : ''].join(' ')}>
			{ userType === 'player'
				?   <div className={styles.avatar}>
					{ avatarName &&
						<Avatar avatarName={avatarName} />
					}
					</div>
				: null }
			<div className={[styles.name,
				userType === 'player' ? styles.name_player : '',
				userType === 'opponent' ? styles.name_opponent : ''].join(' ')}>
				{ name }
			</div>
			{ userType === 'opponent'
				?   <div className={styles.avatar}>
					{ avatarName &&
                        <Avatar avatarName={avatarName} />
					}
					</div>
				: null }
		</div>
	);
});

export default UserInfo;