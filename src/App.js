import axios from 'axios';
import { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color'
import './App.css';


function App() {
  const BASE_URL='https://yl-api.thatguy.gr'
  const [powerState, setPowerState] = useState({device:'',power:''})
  const [lightColor, setLightColor] = useState('')
  const [bulb, setBulb] = useState('')
  const [strip, setStrip] = useState('')
  const [devices,setDevices]=useState('')
  const [tapo,setTapo]=useState('')
  useEffect(() => {
    const fetchData = async () => {
      
      const response = await axios.get(`${BASE_URL}/devices`)
      setBulb(response.data.bulb.power)
      setStrip(response.data.strip.power)
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
        <button className="btn"style={{backgroundColor:bulb==="off"?"#eb3d30":"#008e81"}} onClick={e=>handleSubmit(e,'bulb')}> Bulb </button>
        <button className="btn"style={{backgroundColor:strip==="off"?"#eb3d30":"#008e81"}} onClick={e=>handleSubmit(e,'strip')}>  Strip </button>
        <button className="btn" onClick={e=>handleSubmit(e,'default')}>Default Light</button>
      </div>

      <TwitterPicker
        color={['#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', '#f7f379', "#f7f178", "#f7f178", "#f7f178"]}
        triangle={"hide"}
        onChange={handleColorPickerChange} />
    </div>
  );
}

export default App;
