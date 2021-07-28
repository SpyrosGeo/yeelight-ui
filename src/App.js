import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [powerState, setPowerState] = useState('')
  const [lightColor, setLightColor] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000')
      const { color,power} = response.data
      setPowerState(power)
      setLightColor(color)
      console.log(color)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <h1 style={powerState==="on"?{color:`#${lightColor}`}:{color:'red'}}>yeelight is {powerState}</h1>
    </div>
  );
}

export default App;
