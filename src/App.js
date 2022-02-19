import Map from './components/Map'
import React, {useState, useEffect} from 'react'

function App() {
  const [initialData, setInitialData] = useState([{}])

  useEffect(() => {
    fetch('/server').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);

  return (
    <div>
      {/* <Map /> */}
      <h1>{initialData.alt}</h1>
    </div>
  );
}

export default App;
