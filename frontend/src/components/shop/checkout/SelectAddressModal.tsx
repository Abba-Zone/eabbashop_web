import ListCard from "./AddressCard"
interface Props{
    addressList:addressAllInfo[],
    setModalOpen(type:number):void,
    changeAddress(type:string):void,
}

const SelectAddressModal:React.FC<Props> = ({addressList, setModalOpen, changeAddress}) => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < addressList.length; i++){
          result.push(<ListCard changeAddress ={changeAddress} key={i} address={addressList[i]} ></ListCard>);
        }
        return result;
    }
    return (
        <div>
            <h2>배송지 선택<button onClick={() => {setModalOpen(0)}}>취소</button></h2>
            {rendering()}
            <button>+ 배송지 추가</button>
        </div>
    );
}
    
export default SelectAddressModal;