import { useContext, useState } from 'react';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';
import reactLogo from './assets/react.svg';
import viteLogo from '../public/vite.svg';
import './App.css';

function App() {
	const { idToken, token, tokenData, idTokenData } =
		useContext<IAuthContext>(AuthContext);

	const [response, setResponse] = useState<Record<string, unknown>>();

	const consumeEndpoint = async () => {
		try {
			const requestOptions: RequestInit = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer e${idToken}`,
				},
			};

			const dataResponse = await fetch(
				'https://baintest.azurewebsites.net/api/HttpDataCalculation?code=eLxoDH_Sk0zmipfOM0uwxpL-lk8FwYxQr89h8xXEj0L3AzFuFEfywQ==',
				requestOptions
			);
			const data: Record<string, unknown> = await dataResponse.json();
			setResponse(data);
			/* eslint-disable no-console */
			console.log(data);
		} catch (error) {
			console.error('Error fetching data:', error);
			/* eslint-enable no-console */
			// Handle error state or display error message to the user
		}
	};

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>

			<div>
				<div>
					<p>Access Token:</p>
					<textarea
						name="response"
						rows={10}
						cols={60}
						value={token}
						readOnly
					/>
				</div>

				<div>
					<p>Id Token:</p>
					<textarea
						name="response"
						rows={10}
						cols={60}
						value={idToken}
						readOnly
					/>
				</div>

				<div>
					<p>Decoded Access Token:</p>
					<textarea
						name="response"
						rows={10}
						cols={60}
						value={JSON.stringify(tokenData, null, 2)}
						readOnly
					/>
				</div>

				<div>
					<p>Decoded Id Token:</p>
					<textarea
						name="response"
						rows={10}
						cols={60}
						value={JSON.stringify(idTokenData, null, 2)}
						readOnly
					/>
				</div>
			</div>

			<button type="button" onClick={consumeEndpoint} disabled={!idToken}>
				RUN ME
			</button>
			{response && (
				<div>
					<p>Message:</p>
					{/* Render other data from the response as needed */}
					<textarea
						name="response"
						rows={10}
						cols={60}
						value={JSON.stringify(response)}
						readOnly
					/>
				</div>
			)}
		</>
	);
}

export default App;
