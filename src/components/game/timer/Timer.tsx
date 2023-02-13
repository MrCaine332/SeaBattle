import React, {useEffect, useState} from 'react';

interface ITimer {
	turn: boolean
	toggle: boolean
	connection: any
}

const Timer: React.FC<ITimer> = ({ turn, toggle, connection }) => {
	const [timeLeft, setTimeLeft] = useState<number>(30)

	useEffect(() => {
		const interval = setInterval(() => {
			if (timeLeft > 0)
				setTimeLeft(prevState => prevState - 1)
			if (timeLeft === 0) {
				if (turn) {
					connection.invoke('SkipTurn')
				}
				if (!turn) {
					connection.invoke('CheckOpponent')
				}
			}
		}, 1000)

		return () => {
			clearInterval(interval)
			setTimeLeft(30)
		}
	}, [turn, toggle])

	return (
		<div>
			{ timeLeft }
		</div>
	);
};

export default Timer;