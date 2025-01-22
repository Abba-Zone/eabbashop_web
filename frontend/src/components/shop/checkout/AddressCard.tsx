interface Props{
    address:addressAllInfo,
    changeAddress(type:string):void,
}
const AddressCard:React.FC<Props> = ({address, changeAddress}) => {
    return (
      <div>
        <h2>{address.name}<button onClick={() => {changeAddress(address.addressID)}}>선택</button></h2>
        <div>{address.host}</div>
        <div>{address.phone}</div>
        <div>{address.zipCode}</div>
        <div>{address.baseAddress}</div>
        <div>{address.detailAddress}</div>
      </div>
    );
  }
    
  export default AddressCard;