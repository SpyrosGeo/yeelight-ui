import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { TwitterPicker } from "react-color";
import DeviceCard from "./DeviceCard";
import "./App.css";
function App() {
  const BASE_URL = "https://yl-api.thatguy.gr";
  const [powerState, setPowerState] = useState({ device: "", power: "" });
  const [lightColor, setLightColor] = useState("");
  const [bulbBrightness,setBulbBrightness] = useState()
  const [stripBrightness,setStripBrightness] = useState()
  const [tapoBrightness,setTapoBrightness] = useState()
  const tempRef = useRef(null)
  const [bulb, setBulb] = useState({});
  const [strip, setStrip] = useState({});
  const [tapo, setTapo] = useState({});
  const [piTemp, setPiTemp] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BASE_URL}/devices`);
      response.data.bulb.name = "bulb";
      response.data.strip.name = "strip";
      response.data.tapo.name = "tapo";
      setBulb(response.data.bulb);
      setStrip(response.data.strip);
      setTapo(response.data.tapo);
      setBulbBrightness(response.data.bulb.current_brightness)
      setStripBrightness(response.data.strip.current_brightness)
      setTapoBrightness(response.data.tapo.brightness)
    };
    fetchData();
  }, [powerState]);
  useEffect(()=>{
    const fetchTempData = async() =>{
      const response = await axios.get(`${BASE_URL}/pi/temp`)
      setPiTemp(response.data.pi.cpu_thermal[0][1].toFixed(2))
    }
    fetchTempData()
    tempRef.current = setInterval(fetchTempData,1000*60*5)
    return ()=>{
      if(tempRef.current){
        clearInterval(tempRef.current)
      }
    }
  },[])
  
  const handleSubmit = async (e, device) => {
    e.preventDefault();
    const { data } = await axios.get(`${BASE_URL}/${device}`);
    if (device === "bulb") {
      setBulb(data.power === "on" ? "off" : "on");
    }
    if (device === "strip") setStrip(data.power === "on" ? "off" : "on");
    if (device === "tapo") setTapo(data.power === "on" ? "off" : "on");
    setPowerState({ device, power: data.power });
  };
  const handleBrightness = async (device,brightness ) => {
    const {data } = await axios.get(`${BASE_URL}/brightness/${device.name}/${brightness}`)
    setPowerState({device,power:"on"})
  };

  const handleColorPickerChange = (color) => {
    let hexColor = color.hex;
    if (hexColor.length > 5) {
      hexColor = hexColor.substring(1);
      setLightColor(hexColor);
      const response = axios.get(`${BASE_URL}/color/${hexColor}`);
    }
  };

  return (
    <div className="App container ">
      <div className="row d-flex justify-content-center my-5 ">
        <TwitterPicker
          color={[
            "#f7f379",
            "#f7f379",
            "#f7f379",
            "#f7f379",
            "#f7f379",
            "#f7f379",
            "#f7f379",
            "#f7f379",
            "#f7f178",
            "#f7f178",
            "#f7f178",
          ]}
          triangle={"hide"}
          onChange={handleColorPickerChange}
        />
        <Button
          className="mt-2 col col-9 shadow"
          variant="warning"
          onClick={(e) => handleSubmit(e, "default")}
        >
          Default {piTemp}
        </Button>
      </div>
      <div className=" container d-flex justify-content-around mt-5">
        <DeviceCard
          device={bulb}
          brightness={bulbBrightness}
          handleBrightness={handleBrightness}
          handleSubmit={handleSubmit}
          handleColorPickerChange={handleColorPickerChange}
        />
        <DeviceCard
          device={tapo}
          brightness={tapoBrightness}
          handleBrightness={handleBrightness}
          handleSubmit={handleSubmit}
          handleColorPickerChange={handleColorPickerChange}
        />
        <DeviceCard
          device={strip}
          brightness={stripBrightness}
          handleBrightness={handleBrightness}
          handleSubmit={handleSubmit}
          handleColorPickerChange={handleColorPickerChange}
        />
      </div>
    </div>
  );
}

export default App;
