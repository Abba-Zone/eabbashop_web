import { SetStateAction, useState } from "react";
import ListCard from "./AddressCard"
import DaumPostcodeEmbed from "react-daum-postcode";
import { registAddress_s } from "../../../services/address";
interface Props{
    addressList:addressAllInfo[],
    setAddressList(addressList:addressAllInfo[]):void;
    setModalOpen(type:number):void,
    changeAddress(type:string):void,
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
const SelectAddressModal:React.FC<Props> = ({addressList, setAddressList, setModalOpen, changeAddress}) => {
    const [addFlag, setAddFlag] = useState<boolean>(false);
    const [Modal, setModal] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [registPhone, setRegistPhone] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [baseAddress, setBaseAddress] = useState<string>("");
    const [detailAddress, setDetailAddress] = useState<string>("");
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < addressList.length; i++){
          result.push(<ListCard changeAddress ={changeAddress} key={i} address={addressList[i]} ></ListCard>);
        }
        return result;
    }
    const registAddress = async () =>{
        const newAddress:registAddress ={
            name : lastName + firstName,
            lastName : lastName,
            firstName : firstName,
            country : "",
            zipCode : zipCode,
            bassAddress : baseAddress,
            detailAddress : detailAddress,
            isBill : false,
            isMain : false,
            phone : registPhone,
            comment : "없음",
        }
        const newAddressList:addressList = await registAddress_s(newAddress);
        setAddressList(newAddressList.list);
        changeAddress(newAddressList.list[newAddressList.list.length-1].addressID);
        setAddFlag(false);
    }
    const onCompletePost = (data: { address: string; zonecode: string; }) => {
        setModal(false);
        setBaseAddress(data.address);
        setZipCode(data.zonecode);
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
    return (
        <div>
            <h2>주소 선택<button onClick={() => {setModalOpen(0)}}>취소</button></h2>
            {rendering()}
            {addFlag?
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
                    <button onClick={registAddress}>등록</button>
                </div> 
                : <button onClick={() => setAddFlag(true)}>+ 주소 추가</button>}
            
        </div>
    );
}
    
export default SelectAddressModal;