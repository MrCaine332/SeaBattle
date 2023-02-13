import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Registration from "../pages/auth/Registration";
import Layout from "../pages/_layout";
import Play from "../pages/play/Play";
import Leaderboard from "../pages/leaderboard/Leaderboard";
import Login from "../pages/auth/Login";
import {useAppSelector} from "../app/hooks/redux";
import Game from "../pages/game/Game";
import Account from "../pages/account/Account";

const Router = () => {
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	const didBattleStarted = useAppSelector(state => state.game.didBattleStarted)

	return (
		<>
			{ !isAuthenticated &&
                <Routes>
                    <Route path={'/registration'} element={<Registration />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'*'} element={<Navigate to={'/login'} replace/>} />
                </Routes>
			}
			{ isAuthenticated &&
                <Layout>
                    <Routes>
                        <Route path={'/play'} element={<Play />} />
	                    { didBattleStarted
		                    ? <Route path={'/game'} element={<Game />} />
		                    : null }
                        <Route path={'/leaderboard'} element={<Leaderboard />} />
                        <Route path={'/account'} element={<Account />} />
	                    <Route path={'*'} element={<Navigate to={'/play'} replace />} />
                    </Routes>
                </Layout>
			}
		</>
	);
};

export default Router;