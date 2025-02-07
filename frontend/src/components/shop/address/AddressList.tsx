import { useEffect, useState } from "react";
import ListCard from "./AddressListCard";
import { setBillAddress_s, setMainAddress_s } from "../../../services/address";

interface Props{
  addressList:addressAllInfo[],
  billID: string,
  mainID: string,
  setAddressList(addressList:addressAllInfo[]):void;
  setBillID(ID:string):void,
  setMainID(ID:string):void,
}
const AddressList:React.FC<Props> = ({addressList, billID, mainID, setAddressList, setBillID, setMainID}) => {
    const [billAddress, setBillAddress] = useState<addressAllInfo | null>(null);
    const [mainAddress, setMainAddress] = useState<addressAllInfo | null>(null);
    useEffect(() => {
        const newBillAddress = addressList.find((item) => item.addressID === billID) || null;
        setBillAddress(newBillAddress);
    }, [billID]);
        useEffect(() => {
        const newDeliveryAddress = addressList.find((item) => item.addressID === mainID) || null;
        setMainAddress(newDeliveryAddress);
    }, [mainID]);
    const changeAddress = async (changeID:string, type:string) =>{
        if(type === "bill"){
            const newListInfo = await setBillAddress_s({addressID:changeID, preAddressID:billID})
            setAddressList(newListInfo.list)
            console.log(newListInfo);
            setBillID(changeID)
        }
        else{
            const newListInfo = await setMainAddress_s({addressID:changeID, preAddressID:mainID})
            setAddressList(newListInfo.list)
            console.log(newListInfo);
            setMainID(changeID)
        }
    }
    const rendering = (): JSX.Element[] => {
        const result = [];
        let check = 0;
        for(let i = 0 ; i < addressList.length; i++){
            if (addressList[i].addressID === billID || addressList[i].addressID === mainID)continue;
            check++;
            result.push(<ListCard changeAddress ={changeAddress} key={i + 1} address={addressList[i]} billID={billID} mainID={mainID} cardType={"Base"} setAddressList={setAddressList}></ListCard>);
        }
        if(check == 0)
            result.push(<div key={0}>그 외 주소가 없습니다.</div>)
        return result;
    }
    return (
        <div>
            <h3>기본주소</h3>
            {mainAddress?<ListCard address={mainAddress} changeAddress={changeAddress} billID={billID} mainID={mainID} cardType={"Main"} setAddressList={setAddressList}></ListCard>:<div>기본 주소를 설정해 주세요.</div>}
            <h3>청구주소</h3>
            {billAddress?<ListCard address={billAddress} changeAddress={changeAddress} billID={billID} mainID={mainID} cardType={"Bill"} setAddressList={setAddressList}></ListCard>:<div>청구 주소를 설정해 주세요.</div>}
            <h3>그 외</h3>
            {rendering()}
        </div>
    );
}
  
export default AddressList;