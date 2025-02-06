interface Props{
    address:addressAllInfo,
    billID:string,
    mainID:string,
    changeAddress(addressID:string, type:string):void,
}
const AddressListCard:React.FC<Props> = ({address, billID, mainID, changeAddress}) => {
    return (
      <div>
        <h3>{address.name}
          {billID !== address.addressID && <button onClick={() => {changeAddress(address.addressID, "bill")}}>청구 주소로 설정</button>}
          {mainID !== address.addressID && <button onClick={() => {changeAddress(address.addressID, "main")}}>기본 주소로 설정</button>}
        </h3>
        <div>{address.lastName} {address.firstName}</div>
        <div>{address.phone}</div>
        <div>{address.zipCode}</div>
        <div>{address.baseAddress}</div>
        <div>{address.detailAddress}</div>
      </div>
    );
  }
    
  export default AddressListCard;