import axios from 'axios';
import { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color'
import './App.css';


function App() {
  const BASE_URL='https://yl-api.thatguy.gr'
  const [powerState, setPowerState] = useState('')
  const [lightColor, setLightColor] = useState('')
  const [bulb, setBulb] = useState('')
  const [strip, setStrip] = useState('')
  const [devices,setDevices]=useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(BASE_URL)
      const { color, power } = response.data
      power ==="on"?setDevices('off'):setDevices('on')
      setPowerState(power)
      setLightColor(color)

    }
    fetchData()
  }, [powerState])

  const handleSubmit = async (e,device) => {
    e.preventDefault()
    const {data} = await axios.get(`${BASE_URL}/${device}`)
    if(device==='bulb')setBulb(data.power==="on"?'off':'on')
    if(device==='strip')setBulb(data.power==="on"?'off':'on')
    setPowerState('')
  }

  const handleColorPickerChange = (color) => {
    // setColorPicker(color);
    let hexColor = color.hex
    if (hexColor.length > 5) {
      hexColor = hexColor.substring(1)
      setLightColor(hexColor)
      const response = axios.get(`${BASE_URL}/color/${hexColor}`)

    }
  }

  const handleDefaultLightState = () => {
    const response = axios.get(`${BASE_URL}/default`)
    setLightColor('#ccd613')
  }
  return (
    <div className="App">
      <h1 style={powerState === "on" ? { color: `#${lightColor}` } : { color: 'red' }}>Bulb is {powerState}</h1>
      <div className="button-group">
        <button className="btn" onClick={e=>handleSubmit(e,'on')}> Turn Lights {devices}</button>
        <button className="btn" onClick={e=>handleSubmit(e,'bulb')}> Turn Bulb {bulb}</button>
        <button className="btn" onClick={e=>handleSubmit(e,'strip')}> Turn Strip {strip}</button>
      <button className="btn" onClick={handleDefaultLightState}>Default Light</button>
      </div>

      <TwitterPicker
        color={['#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', "#f7f178", "#f7f178", "#f7f178"]}
        triangle={"hide"}
        onChange={handleColorPickerChange} />
    </div>
  );
}

export default App;
