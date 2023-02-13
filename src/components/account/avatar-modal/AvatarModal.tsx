import React from 'react';
import styles from './AvatarModal.module.scss'
import Avatar from "../../ui/avatar/Avatar";

interface IAvatarModal {
	onChange: (value: string) => void
	onClose?: () => void
}

const avatarNames = [
	'avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg', 'avatar4.jpg',
	'avatar5.jpg', 'avatar6.jpg', 'avatar7.jpg', 'avatar8.jpg',
	'avatar9.jpg', 'avatar10.jpg', 'avatar11.jpg', 'avatar12.jpg',
]

const AvatarModal: React.FC<IAvatarModal> = ({ onChange, onClose }) => {

	const onAvatarClick = (avatarName: string) => {
		onChange(avatarName)
		if (onClose)
			onClose()
	}

	return (
		<div className={styles.avatarModal}>
			{ avatarNames.map((avatarName, index) => (
				<div key={index} className={styles.avatar} onClick={() => onAvatarClick(avatarName)}>
					<Avatar avatarName={avatarName} />
				</div>
			)) }
		</div>
	);
};

export default AvatarModal;