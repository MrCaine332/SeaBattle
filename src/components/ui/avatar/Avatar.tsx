import React, {memo} from 'react';
import styles from './Avatar.module.scss'

import avatar0 from '../../../resources/avatars/avatar0.jpg'
import avatar1 from '../../../resources/avatars/avatar1.jpg'
import avatar2 from '../../../resources/avatars/avatar2.jpg'
import avatar3 from '../../../resources/avatars/avatar3.jpg'
import avatar4 from '../../../resources/avatars/avatar4.jpg'
import avatar5 from '../../../resources/avatars/avatar5.jpg'
import avatar6 from '../../../resources/avatars/avatar6.jpg'
import avatar7 from '../../../resources/avatars/avatar7.jpg'
import avatar8 from '../../../resources/avatars/avatar8.jpg'
import avatar9 from '../../../resources/avatars/avatar9.jpg'
import avatar10 from '../../../resources/avatars/avatar10.jpg'
import avatar11 from '../../../resources/avatars/avatar11.jpg'
import avatar12 from '../../../resources/avatars/avatar12.jpg'

interface IAvatar {
	avatarName: string
}

const getAvatar = (avatarName: string) => {
	switch (avatarName) {
		case 'avatar0.jpg': return avatar0
		case 'avatar1.jpg': return avatar1
		case 'avatar2.jpg': return avatar2
		case 'avatar3.jpg': return avatar3
		case 'avatar4.jpg': return avatar4
		case 'avatar5.jpg': return avatar5
		case 'avatar6.jpg': return avatar6
		case 'avatar7.jpg': return avatar7
		case 'avatar8.jpg': return avatar8
		case 'avatar9.jpg': return avatar9
		case 'avatar10.jpg': return avatar10
		case 'avatar11.jpg': return avatar11
		case 'avatar12.jpg': return avatar12
		default: return avatar0
	}
}

const Avatar: React.FC<IAvatar> = memo(({ avatarName }) => {
	const avatar = getAvatar(avatarName)

	return (
		<>
			<img className={styles.avatarImage}
			     src={avatar} alt={''} />
		</>
	);
});

export default Avatar;