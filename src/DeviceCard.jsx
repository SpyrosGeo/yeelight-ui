import { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { TwitterPicker } from "react-color";
import { faChevronLeft,faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const DeviceCard = ({
  device,
  handleSubmit,
  handleColorTemp,
  brightness,
  handleBrightness,
}) => {
  const [slider,setSlider] = useState(0)

  useEffect(()=>{
    setSlider(device.ct)
  },[device])
  const handleChangeBrightness = (command) => {
    if(command==="increment" && brightness<100){
      handleBrightness(device,+brightness+10)
    }
    if(command==="decrement" &&brightness>10){
    handleBrightness(device,+brightness-10);
    }
  };
  const handleSlider = (e)=>{
    let ct = e.target.value
    setSlider(ct)
    setTimeout(()=>{
    handleColorTemp(device,ct)
    },1000)
  }
  return (
    <div>
      <Card
        className="shadow"
        text="white"
        bg={device.power === "off" ? "danger" : "success"}
        style={{ width: "11rem" }}
      >
        <Card.Img
          onClick={(e) => handleSubmit(e, device.name)}
          style={{ height: "13rem" }}
          as={Image}
          variant="top"
          src={`${device.name?.toLowerCase()}.jpg`}
        />
        <Card.Body>
          <div>
            <label  htmlFor="customRange1" className="form-label">
              Brightness
            </label>
            <div className="d-flex justify-content-between align-items-center">
              <Button className="btn btn-warning" onClick={()=>{handleChangeBrightness('decrement')}}><FontAwesomeIcon className="arrow" icon={faChevronLeft}/></Button>
              <span>{brightness}%</span>
              <Button className="btn btn-warning" onClick={()=>{handleChangeBrightness('increment')}}><FontAwesomeIcon className="arrow" icon={faChevronRight}/></Button>
            </div>
            { device?.name==='tapo'?'':
              <div className="slider d-flex p-2 mt-2">
                <input  onChange={handleSlider} step="100" min="2700" max="4700" value={slider} type="range"/>
            </div>
            }
                      </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DeviceCard;
