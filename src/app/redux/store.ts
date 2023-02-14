import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import gameReducer from "./slices/game-slice";
import connectionReducer from "./slices/connection-slice";
import leaderboardReducer from "./slices/leaderboard.slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        game: gameReducer,
        connection: connectionReducer,
        leaderboard: leaderboardReducer
    }
})

export default store

// @ts-ignore
window.store = store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch