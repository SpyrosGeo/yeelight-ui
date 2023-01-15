import { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { TwitterPicker } from "react-color";
const DeviceCard = ({
  device,
  handleSubmit,
  handleColorPickerChange,
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
    console.log('ct',ct)
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
            <div className="d-flex justify-content-between">
              <Button onClick={()=>{handleChangeBrightness('decrement')}}>-</Button>
              <span>{brightness}%</span>
              <Button onClick={()=>{handleChangeBrightness('increment')}}>+</Button>
            </div>
            { device?.name==='tapo'?'':
              <div className="my-1">
                <input onChange={handleSlider} step="100" min="2700" max="4700" value={slider} type="range"/>
            </div>
            }
                      </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DeviceCard;
