import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	AuthProvider,
	TAuthConfig,
	TRefreshTokenExpiredEvent,
} from 'react-oauth2-code-pkce';
import App from './App';
import './index.css';

const authConfig: TAuthConfig = {
	clientId:
		'3MVG9_MSrVW5eWEkso6.SrdgIxVJwshVLoHGAGQKXYfptDXTFuvLp4SjfDJVU5poJlq_5CKgmgmYwQ3dD2RE0',
	authorizationEndpoint:
		'https://jamesrbainpoc-dev-ed.develop.my.salesforce.com/services/oauth2/authorize',
	tokenEndpoint:
		'https://jamesrbainpoc-dev-ed.develop.my.salesforce.com/services/oauth2/token',
	redirectUri: 'http://localhost:3000/',
	scope: 'openid',
	onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => {
		// eslint-disable-next-line no-console
		console.log('Refresh token expired:', new Date());
		event.login();
	},
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider authConfig={authConfig}>
			<App />
		</AuthProvider>
	</React.StrictMode>
);
