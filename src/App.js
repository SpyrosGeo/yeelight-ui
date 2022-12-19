import axios from 'axios';
import { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import { TwitterPicker } from 'react-color'
import DeviceCard from './DeviceCard';
import './App.css';
function App() {
  const BASE_URL='https://yl-api.thatguy.gr'
  const [powerState, setPowerState] = useState({device:'',power:''})
  const [lightColor, setLightColor] = useState('')
  const [bulb, setBulb] = useState({})
  const [strip, setStrip] = useState({})
  const [devices,setDevices]=useState('')
  const [tapo,setTapo]=useState('')
  useEffect(() => {
    const fetchData = async () => {
      
      const response = await axios.get(`${BASE_URL}/devices`)
      response.data.bulb.name='Bulb'
      response.data.strip.name='Strip'
      setBulb(response.data.bulb)
      setStrip(response.data.strip)
    }
    fetchData()
  }, [powerState])

  const handleSubmit = async (e,device) => {
    e.preventDefault()
    const {data} = await axios.get(`${BASE_URL}/${device}`)
    if(device==='bulb'){setBulb(data.power==="on"?'off':'on')}
    if(device==='strip')setStrip(data.power==="on"?'off':'on')
    setPowerState({device,power:data.power})
  }

  const handleColorPickerChange = (color) => {
    let hexColor = color.hex
    if (hexColor.length > 5) {
      hexColor = hexColor.substring(1)
      setLightColor(hexColor)
      const response = axios.get(`${BASE_URL}/color/${hexColor}`)
    }
  }

  
  return (
    <div className="App ">
      <div className="container button-group">

      </div>

      <TwitterPicker
        color={['#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', "#f7f178", "#f7f178", "#f7f178"]}
        triangle={"hide"}
        onChange={handleColorPickerChange} />
      <div className=' container d-flex justify-content-around mt-5'>
      <DeviceCard  device={bulb} handleSubmit={handleSubmit} handleColorPickerChange={handleColorPickerChange}/>
      <DeviceCard  device={strip} handleSubmit={handleSubmit} handleColorPickerChange={handleColorPickerChange}/>
        </div>
    </div>

  );
}

export default App;
