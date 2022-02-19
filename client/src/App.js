import Map from './components/Map'
import React, { useEffect, useState } from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])

  // passing in empty array only runs on first load
  useEffect(() => {
    fetch('/api').then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])


  return (
    <div>
      {/* <Map /> */}
      <h1>{backendData.alt}</h1>
    </div>
  );
}

export default App;
