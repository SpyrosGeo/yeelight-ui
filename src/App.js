import axios from 'axios';
import { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color'
import './App.css';


function App() {
  const [powerState, setPowerState] = useState('')
  const [lightColor, setLightColor] = useState('')
  const [buttonState, setButtonState] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000')
      const { color, power } = response.data
      if (power === "on") {
        setButtonState('off')
      } else if (power === 'off') {
        setButtonState('on')
      }
      setPowerState(power)
      setLightColor(color)

    }
    fetchData()
  }, [powerState])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.get('http://localhost:5000/on')
    setPowerState('')
  }

  const handleColorPickerChange = (color) => {
    // setColorPicker(color);
    let hexColor = color.hex
    if (hexColor.length > 5) {
      hexColor = hexColor.substring(1)
      setLightColor(hexColor)
      const response = axios.get(`http://localhost:5000/color/${hexColor}`)

    }
  }

  const handleDefaultLightState = () => {
    const response = axios.get("http://localhost:5000/default")
    setLightColor('#ccd613')
  }
  return (
    <div className="App">
      <h1 style={powerState === "on" ? { color: `#${lightColor}` } : { color: 'red' }}>yeelight is {powerState}</h1>
      <form action="" method="get" onSubmit={handleSubmit}>
      <button className="btn" type="submit"> Turn Light {buttonState}</button>
      </form>
      <button className="btn" onClick={handleDefaultLightState}>Default Light</button>

      <TwitterPicker
        color={['#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', "#f7f178", "#f7f178", "#f7f178"]}
        triangle={"hide"}
        onChange={handleColorPickerChange} />
    </div>
  );
}

export default App;
