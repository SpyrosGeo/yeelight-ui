import { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { TwitterPicker } from "react-color";
const DeviceCard = ({
  device,
  handleSubmit,
  handleColorPickerChange,
  brightness,
  handleBrightness,
}) => {


  const handleSlider = (command) => {
    if(command==="increment" && brightness<100){
      handleBrightness(device,+brightness+10)
    }
    if(command==="decrement" &&brightness>10){
    handleBrightness(device,+brightness-10);
    }
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
            <label  htmlFor="customRange1" className="form-label">
              Brightness
            </label>
            <div className="d-flex justify-content-between">
              <Button onClick={()=>{handleSlider('decrement')}}>-</Button>
              <span>{brightness}%</span>
              <Button onClick={()=>{handleSlider('increment')}}>+</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DeviceCard;
