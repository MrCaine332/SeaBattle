import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.scss';
import './styles/colors.scss'
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./app/redux/store";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	// <React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>
	// </React.StrictMode>
);
