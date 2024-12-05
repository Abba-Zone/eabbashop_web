import { useState } from "react";

interface Props{
  address:addressAllInfo[],
}
const MemberAdminAddress:React.FC<Props> = ({address}) => {
  const [addressId, setAddressId] = useState<number>(0);
  
  const renderingButton = (): JSX.Element[] => {
    const result = [];
    for(let i = 0 ; i < address.length ; i++){
        result.push(<button key={i} onClick={() => {setAddressId(i)}}> {address[i].name} </button>);
    }
    return result;
  }
  if (address.length === 0){
    return(
      <div>
        <h1>주소 정보가 없습니다.</h1>
      </div>
    );
  }

  return (
    <div>
      <h3>MemberAdminAddress</h3>
      {renderingButton()}
      <div><div>우편번호</div><div>{address[addressId].zipCode}</div></div>
      <div><div>기본주소</div><div>{address[addressId].baseAddress}</div></div>
      <div><div>상세주소</div><div>{address[addressId].detailAddress}</div></div>
      <div><div>국가</div><div>{address[addressId].country}</div></div>
      <div><div>받는사람</div><div>{address[addressId].host}</div></div>
      <div><div>전화번호</div><div>{address[addressId].phone}</div></div>
      <div><div>요청사항</div><div>{address[addressId].comment}</div></div>
      <div><div>청구주소</div><div>{address[addressId].isBill?"O":"X"}</div></div>
      <div><div>기본주소</div><div>{address[addressId].isMain?"O":"X"}</div></div>
    </div>
  );
}
  
export default MemberAdminAddress;
  