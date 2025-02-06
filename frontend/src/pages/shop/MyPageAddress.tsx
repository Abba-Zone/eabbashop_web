import { useCallback, useEffect, useState } from "react";
import { getAddressList_s } from "../../services/address";
import { AddressList } from "../../components";

const MyPageAddress:React.FC = () => {
  const [addressList, setAddressList] = useState<addressAllInfo[]>([]);
  const [billID, setBillID] = useState<string>("");
  const [mainID, setMainID] = useState<string>("");
  const getAddressList = useCallback( async () => {
    try {
      const list = await getAddressList_s();
      setAddressList(list.list);
      for(let i = 0 ; i < list.list.length ; i++){
        if(list.list[i].isMain)
          setMainID(list.list[i].addressID);
        if(list.list[i].isBill)
          setBillID(list.list[i].addressID);
      }
    } catch (error) {
      console.error('Error fetching address list:', error);
    }
  },[]);
  useEffect(() => {
    getAddressList();
  }, [getAddressList]);
  return (
    <div>
      <h1>내 주소록</h1>
      <AddressList addressList={addressList} billID={billID} mainID={mainID} setAddressList={setAddressList} setBillID={setBillID} setMainID={setMainID}></AddressList>
    </div>
  );
}

export default MyPageAddress;
