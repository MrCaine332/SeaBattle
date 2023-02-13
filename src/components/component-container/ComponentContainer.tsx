import React, {ReactNode} from 'react';
import styles from './ComponentContainer.module.scss'

interface IComponentContainer {
	children: ReactNode
	className?: string
}

const ComponentContainer: React.FC<IComponentContainer> = ({ children, className }) => {
	return (
		<div className={[styles.componentContainer, className].join(' ')}>
			<div className={'container'}>
				{ children }
			</div>
		</div>
	);
};

export default ComponentContainer;