import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { deleteAddress_s, updateAddress_s } from "../../../services/address";

interface Props{
    address:addressAllInfo,
    billID:string,
    devliveryID:string,
    setAddressList(addressList:addressAllInfo[]):void;
    changeAddress(type:string):void,
    deleteAdd(addressID:string):void
}
const style = {
  width: '360px',
  height: '480px',
  border: "1.4px solid #333333",
};
const themeObj = {
  bgColor: '#FFFFFF', 
  pageBgColor: '#FFFFFF', 
  postcodeTextColor: '#C05850',
  emphTextColor: '#222222',
};
const AddressCard:React.FC<Props> = ({address, billID, devliveryID, setAddressList, changeAddress, deleteAdd}) => {
  const [modify, setModify] = useState<boolean>(false);
    const [Modal, setModal] = useState<boolean>(false);
    const [name, setName] = useState<string>(address.name);
    const [lastName, setLastName] = useState<string>(address.lastName);
    const [firstName, setFirstName] = useState<string>(address.firstName);
    const [phone, setPhone] = useState<string>(address.phone);
    const [registPhone, setRegistPhone] = useState<string>(address.phone);
    const [zipCode, setZipCode] = useState<string>(address.zipCode);
    const [baseAddress, setBaseAddress] = useState<string>(address.baseAddress);
    const [detailAddress, setDetailAddress] = useState<string>(address.detailAddress);
    const [comment, setComment] = useState<string>(address.comment);
    const modifyAddress = async () =>{
      const newAddress:modifyAddress = {
          addressID: address.addressID,
          name: name,
          lastName: lastName,
          firstName: firstName,
          country: "KOR",
          zipCode: zipCode,
          baseAddress: baseAddress,
          detailAddress: detailAddress,
          phone: registPhone,
          comment: comment,
      }
      const newAddressList:addressList = await updateAddress_s(newAddress);
      setAddressList(newAddressList.list);
      changeAddress(address.addressID);
      setModify(false);
    }
    const onCompletePost = (data: { address: string; zonecode: string; }) => {
      setBaseAddress(data.address);
      setZipCode(data.zonecode);
      setModal(false);
    };
    const inputPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneNum = event.target.value;
        setPhone(phoneNum)
        if (validatePhone(phoneNum))
            setRegistPhone(phoneNum)
    }
    const validatePhone = (phone: string) => {
        const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
        return phoneRegex.test(phone);
    };
    const registCancel = () =>{
      resetInfo();
      setModify(false);
    }
    const resetInfo = () => {
        setName(address.name);
        setLastName(address.lastName);
        setFirstName(address.firstName);
        setPhone(address.phone);
        setRegistPhone(address.phone);
        setZipCode(address.zipCode);
        setBaseAddress(address.baseAddress);
        setDetailAddress(address.detailAddress);
        setComment(address.comment);
    }
    return (
      <div>
        {modify?
        <div>
          <div>
              <label htmlFor='name'>태그  : </label>
              <input type='text' value={name} placeholder="ex)우리집, 회사..." onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setName(event.target.value)}}/>
          </div>
          <div>
              <label htmlFor='lastName'>성 : </label>
              <input type='text' value={lastName} placeholder="성" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setLastName(event.target.value)}}/>
          </div>
          <div>
              <label htmlFor='firstName'>이름 : </label>
              <input type='text' value={firstName} placeholder="이름" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setFirstName(event.target.value)}}/>
          </div>
          <div>
              <label htmlFor='firstName'>전화번호 : </label>
              <input type='text' value={phone} placeholder="010-0000-0000" onChange={inputPhone}/>
          </div>
          <div>
              <label htmlFor='zipCode'>우편번호 : </label>
              <input type='text' value={zipCode} placeholder="우편번호" readOnly onClick={() => {if(zipCode==="")setModal(true)}}/>
              <button onClick={() => setModal(!Modal)}>주소찾기</button>
          </div>
          <div>
              <label htmlFor='baseAddress'>기본주소 : </label>
              <input type='text' value={baseAddress} placeholder="기본주소" readOnly/>
          </div>
          <div>
              <label htmlFor='baseAddress'>상세주소 : </label>
              <input type='text' value={detailAddress} placeholder="상세주소" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setDetailAddress(event.target.value)}}/>
          </div>
          
          {Modal&&<DaumPostcodeEmbed theme={themeObj} style={style} onComplete={onCompletePost}/>}
          <button onClick={modifyAddress}>수정</button><button onClick={registCancel}>취소</button>
      </div>
      :<div>
          <h2>{address.name}<button onClick={() => {changeAddress(address.addressID)}}>선택</button><button onClick={() => {setModify(true)}}>수정</button></h2>
          {address.isMain || address.isBill || address.addressID === billID || address.addressID === devliveryID? <></>:<button onClick={() => {deleteAdd(address.addressID)}}>삭제</button>}
          <div>{address.lastName} {address.firstName}</div>
          <div>{address.phone}</div>
          <div>{address.zipCode}</div>
          <div>{address.baseAddress}</div>
          <div>{address.detailAddress}</div>
        </div>}
      </div>
    );
  }
    
  export default AddressCard;