import { useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { TwitterPicker } from "react-color";
const DeviceCard = ({
  device,
  brightness,
  handleSubmit,
  handleColorPickerChange,
  handleBrightness,
}) => {
  const [slider, setSlider] = useState(0);

  const handleSlider = (command) => {
    if(command==="increment" && slider<100){
    setSlider(slider+10);
    }
    if(command==="decrement" && slider>0){
    setSlider(slider-10);
    }
    handleBrightness(device, slider);
  };

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
            <label  for="customRange1" class="form-label">
              Brightness{" "}
            </label>
            <div className="d-flex justify-content-between">
              <Button onClick={()=>{handleSlider('decrement')}}>-</Button>
              <span>{slider}%</span>
              <Button onClick={()=>{handleSlider('increment')}}>+</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DeviceCard;
