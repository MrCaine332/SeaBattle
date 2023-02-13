import React from 'react';
import styles from './Divider.module.scss'

type Divider = {
	direction?: 'vertical' | 'horizontal'
}

const Divider: React.FC<Divider> = ({ direction = 'horizontal' }) => {
	return (
		<>
			<hr className={[styles.divider,
				direction === 'vertical' ? styles.dividerVertical : '',
				direction === 'horizontal' ? styles.dividerHorizontal : ''].join(' ')}/>
		</>
	);
};

export default Divider;