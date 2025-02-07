import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { registAddress_s } from "../../../services/address";
interface Props{
  setAddressList(addressList:addressAllInfo[]):void;
  nowListLength:number
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
const RegistAddress:React.FC<Props> = ({setAddressList, nowListLength}) => {
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
    const [comment, setComment] = useState<string>("없음");
    const registAddress = async () =>{
            const newAddress:registAddress ={
                name : name,
                lastName : lastName,
                firstName : firstName,
                country : "KOR",
                zipCode : zipCode,
                baseAddress : baseAddress,
                detailAddress : detailAddress,
                isBill : nowListLength === 0,
                isMain : nowListLength === 0,
                phone : registPhone,
                comment : comment,
            }
            const newAddressList:addressList = await registAddress_s(newAddress);
            setAddressList(newAddressList.list);
            resetInfo();
            setAddFlag(false);
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
        setAddFlag(false);
    }
    const resetInfo = () => {
        setName("");
        setLastName("");
        setFirstName("");
        setPhone("");
        setRegistPhone("");
        setZipCode("");
        setBaseAddress("");
        setDetailAddress("");
        setComment("없음");
    }
    return (
        <div>
            {addFlag?
                <div>
                    <h3>새 주소 작성</h3>
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
                    <div>
                        <label htmlFor='comment'>요청사항 : </label>
                        <input type='text' value={comment} placeholder="상세주소" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setComment(event.target.value)}}/>
                    </div>
                    {Modal&&<DaumPostcodeEmbed theme={themeObj} style={style} onComplete={onCompletePost}/>}
                    <button onClick={registAddress}>등록</button><button onClick={registCancel}>취소</button>
                </div> 
                : nowListLength===5?<></>:<button onClick={() => setAddFlag(true)}>+ 주소 추가</button>}
        </div>
    );
}
  
export default RegistAddress;