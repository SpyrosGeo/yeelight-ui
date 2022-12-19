import {Card,Button, Image} from "react-bootstrap"
import { TwitterPicker } from "react-color"
const DeviceCard = ({device,handleSubmit,handleColorPickerChange})=>{
  console.log('device',device)
  return (
    <Card onClick={e=>handleSubmit(e,device.name?.toLowerCase())} text="white" bg={device.power==='off'?'danger':'success'} style={{ width: '11rem', }}>
      <Card.Img style={{height:'13rem'}}  as={Image}variant="top" src={`${device.name?.toLowerCase()}.jpg`} />
      <Card.Body>
    
      </Card.Body>
    </Card>
  )

}
export default DeviceCard
