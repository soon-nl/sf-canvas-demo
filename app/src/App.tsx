import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [sfContext, setSFContext] = useState<Record<string, unknown>>();


  const [response, setResponse] = useState<Record<string, unknown>>();

  useEffect(() => {
  // @ts-ignore
   setSFContext(window.sfContext);
  }
  , []);


  const consumeEndpoint = async ()=> {
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await fetch('https://baintest.azurewebsites.net/api/HttpDataCalculation?code=eLxoDH_Sk0zmipfOM0uwxpL-lk8FwYxQr89h8xXEj0L3AzFuFEfywQ==', requestOptions);
      const data: Record<string, unknown> = await response.json();
      setResponse(data);

      console.log(data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or display error message to the user
      
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <button onClick={consumeEndpoint}>RUN ME</button>
      {response && (
        <div>
          <p>Message:</p>
          {/* Render other data from the response as needed */}
          <textarea name="response" rows={10} cols={60} value={JSON.stringify(response)} readOnly />
        </div>
      )}
      {sfContext && (<div><p>SFContext:</p>
      <textarea name="response" rows={10} cols={60} value={JSON.stringify(sfContext)} readOnly /></div>)}
    </>
  )
}

export default App
