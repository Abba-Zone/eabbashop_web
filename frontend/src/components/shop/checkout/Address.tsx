import { useEffect, useRef, useState } from "react";
import Bill from "./Bill";
import Delivery from "./Delivery";
import SelectAddressModal from "./SelectAddressModal";

interface Props{
  addressList:addressAllInfo[],
  billID: string,
  devliveryID: string,
  setAddressList(addressList:addressAllInfo[]):void;
  setBillID(ID:string):void,
  setDevliveryID(ID:string):void,
}
const Address:React.FC<Props> = ({addressList, billID, devliveryID, setAddressList, setBillID, setDevliveryID}) => {
  const [billAddress, setBillAddress] = useState<addressAllInfo | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<addressAllInfo | null>(null);
  const [modalOpen, setModalOpen] = useState<number>(0);
  useEffect(() => {
    const newBillAddress = addressList.find((item) => item.addressID === billID) || null;
    setBillAddress(newBillAddress);
  }, [billID]);
  useEffect(() => {
    const newDeliveryAddress = addressList.find((item) => item.addressID === devliveryID) || null;
    setDeliveryAddress(newDeliveryAddress);
  }, [devliveryID]);
  const clickModal = (type:number) => {
    if (type!==0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    setModalOpen(type);
  }
  const changeAddress = (changeID:string) =>{
    if(modalOpen === 1){
      setBillID(changeID)
    }
    else{
      setDevliveryID(changeID)
    }
    setModalOpen(0);
  }
  return (
    <div>
      {
        modalOpen!==0 && 
        <div 
          style={{
          "width": "100%",
          "height": "100%",
          "position": "fixed",
          "top": "0",
          "left": "0",
          "display": "flex",
          "background": "rgba(0, 0, 0, 0.5)"
        }}><div style={{
          "margin": "10%",
          "width": "50%",
          "height": "50%",
          "background": "white",
          "overflow":  "scroll"
        }}><SelectAddressModal addressList={addressList} setModalOpen={clickModal} changeAddress={changeAddress} setAddressList={setAddressList}/></div>
        </div>
      }
      <Bill address={billAddress} setModalOpen={clickModal}></Bill>
      <Delivery address={deliveryAddress} setModalOpen={clickModal}></Delivery>
    </div>
  );
}
  
export default Address;