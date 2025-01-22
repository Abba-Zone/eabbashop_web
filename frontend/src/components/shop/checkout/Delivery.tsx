import { useState } from "react";

interface Props{
  address: addressAllInfo | null,
  setModalOpen(type:number):void,
}

const Delivery:React.FC<Props> = ({address, setModalOpen}) => {
  const [inputFlage, setInputFlage] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(address? address?.comment : "" );
  const changeComment =()=>{
    if (inputFlage){
      //api연결해서 address의 comment 수정
      setInputFlage(false);
    }else{
      setInputFlage(true);
    }
  }
  return (
    <div>
      <h2>배송지<button onClick={() => {setModalOpen(2)}}>배송주소 변경</button></h2>
      <table>
        <tbody>
          <tr>
            <td>이름</td>
            <td>{address?.host}</td>
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
            <td>{inputFlage?<input type='text' value={comment} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setComment(event.target.value)}}/>:comment}<button onClick={()=>{changeComment()}}>수정</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
  
export default Delivery;