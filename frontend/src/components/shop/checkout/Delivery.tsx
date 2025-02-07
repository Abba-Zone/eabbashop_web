import { useEffect, useState } from "react";
import { updateComment_s } from "../../../services/address";

interface Props{
  address: addressAllInfo | null,
  setModalOpen(type:number):void,
  setAddressList(addressList:addressAllInfo[]):void;
}

const Delivery:React.FC<Props> = ({address, setModalOpen, setAddressList}) => {
  const [inputFlage, setInputFlage] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const changeComment = async () =>{
    if (inputFlage){
      if(address){
        const modifyAddressInfo : updateAddress ={
          addressID: address.addressID,
          zipCode:address.zipCode,
          baseAddress: address.baseAddress,
          detailAddress: address.detailAddress,
          country: address.country,
          firstName: address.firstName,
          lastName: address.lastName,
          name: address.name,
          phone: address.phone,
          comment: comment,
        }
        const newAddressList:addressList = await updateComment_s(modifyAddressInfo);
        setAddressList(newAddressList.list);
      }
      setInputFlage(false);
    }else{
      setInputFlage(true);
    }
  }
  const cancelChange = () => {
    if(address)
      setComment(address.comment);
    setInputFlage(false);
  }
  useEffect(() => {
    if(address)
      setComment(address.comment);
  }, [address]);
  return (
    <div>
      <h2>배송지<button onClick={() => {setModalOpen(2)}}>배송주소 변경</button></h2>
      <table>
        <tbody>
          <tr>
            <td>이름</td>
            <td>{address?.lastName} {address?.firstName}</td>
          </tr>
          <tr>
            <td>우편번호</td>
            <td>{address?.zipCode}</td>
          </tr>
          <tr>
            <td>기본주소</td>
            <td>{address?.baseAddress}</td>
          </tr>
          <tr>
            <td>상세주소</td>
            <td>{address?.detailAddress}</td>
          </tr>
          <tr>
            <td>연락처</td>
            <td>{address?.phone}</td>
          </tr>
          <tr>
            <td>배송 요청 사항</td>
            <td>
              {inputFlage?
              <input type='text' value={comment} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setComment(event.target.value)}}/>
              :comment}
              <button onClick={changeComment}>수정</button>
              {inputFlage?<button onClick={cancelChange}>취소</button>:<></>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
  
export default Delivery;