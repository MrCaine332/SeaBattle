import React, {ReactNode, useEffect} from 'react';
import Header from "../components/header/Header";
import SetupConnection from "./_setupConnection";
import {useAppDispatch} from "../app/hooks/redux";
import {gameActions} from "../app/redux/slices/game-slice";
import shipDeployment from "../app/scripts/shipDeploymentListeners";



const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		const boardFromLocalStorage = localStorage.getItem('user-board') || null
		if (boardFromLocalStorage) {
			dispatch(gameActions.setBoard(JSON.parse(boardFromLocalStorage)))
			dispatch(gameActions.resetUserBoard())
		}

		const shipsFromLocalStorage = localStorage.getItem('user-ships') || null
		if (shipsFromLocalStorage) {
			dispatch(gameActions.setShips(JSON.parse(shipsFromLocalStorage)))
		}
	}, [])

	return (
		<SetupConnection>
			{ children }
		</SetupConnection>
	);
};

export default Layout;