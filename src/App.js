import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { TwitterPicker } from "react-color";
import DeviceCard from "./DeviceCard";
import "./App.css";
function App() {
  const BASE_URL = "https://yl-api.thatguy.gr";
  const [powerState, setPowerState] = useState({ device: "", power: "" });
  const [lightColor, setLightColor] = useState("");

  const [bulbBrightness, setBulbBrightness] = useState("");
  const [bulb, setBulb] = useState({});
  const [strip, setStrip] = useState({});
  const [tapo, setTapo] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BASE_URL}/devices`);
      console.log("response", response.data.tapo);
      response.data.bulb.name = "bulb";
      response.data.strip.name = "strip";
      response.data.tapo.name = "tapo";
      setBulb(response.data.bulb);
      setStrip(response.data.strip);
      setTapo(response.data.tapo);
    };
    fetchData();
  }, [powerState]);

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
  const handleBrightness = async (device, brightness) => {
    console.log('pressed')
    const {data } = await axios.get(`${BASE_URL}/brightness/${device.name}/${brightness}`)
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
          Default
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
          handleBrightness={handleBrightness}
          handleSubmit={handleSubmit}
          handleColorPickerChange={handleColorPickerChange}
        />
        <DeviceCard
          device={strip}
          handleBrightness={handleBrightness}
          handleSubmit={handleSubmit}
          handleColorPickerChange={handleColorPickerChange}
        />
      </div>
    </div>
  );
}

export default App;
