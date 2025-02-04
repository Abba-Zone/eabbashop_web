import { useCallback, useEffect, useState } from "react";
import { PurchaseBuyer, PurchaseAddress, PurchasePayment, PurchasePrice, PurchaseProductList } from "../../components"
import { getCartList_s } from "../../services/cart";
import { getAddressList_s } from "../../services/address";
interface buyProduct{
  productID : string, 
  name : string, 
  realPrice : number, 
  SP : number, 
  AW : number, 
  AK : number, 
  cnt: number
}

const Checkout:React.FC = () => {
  const [buyer, setBuyer] = useState<memberInfo>({
    memberID : "1q2w3er4t5t",
    email : "rudgns9334",
    name : "정경훈",
    role : "판매점",
    recommend : "ych526@naver.com",
    phone : "010-9334-1487",
    grade : "VVVVVVVVVVVVVVS",
    createdDateTime : "2024-11-15 16:30:22",
    platform:"zone",
  });
  const [addressList, setAddressList] = useState<addressAllInfo[]>([]);
  const [billID, setBillID] = useState<string>("");
  const [devliveryID, setDevliveryID] = useState<string>("");
  const [cartList, setCartList] = useState<cartInfo[]>([]);
  const getCartList = useCallback( async () => {
    try {
      const list = await getCartList_s();
      setCartList(list.list.filter(item => item.selectYN));
    } catch (error) {
      console.error('Error fetching cart list:', error);
    }
  },[]);
  const getAddressList = useCallback( async () => {
    try {
      const list = await getAddressList_s();
      setAddressList(list.list);
      for(let i = 0 ; i < list.list.length ; i++){
        if(list.list[i].isMain)
          setDevliveryID(list.list[i].addressID);
        if(list.list[i].isBill)
          setBillID(list.list[i].addressID);
      }
    } catch (error) {
      console.error('Error fetching address list:', error);
    }
  },[]);
  const Order = () =>{
    //주어진 정보들로 주문하기
    //페이지 이동
  }
  useEffect(() => {
    getCartList();
    getAddressList();
  }, [getCartList, getAddressList]);
  return (
    <div>
      <h1>주문 / 결제</h1>
      <PurchaseBuyer buyer={buyer}></PurchaseBuyer>
      <PurchaseAddress addressList={addressList} billID={billID} devliveryID={devliveryID} setBillID={setBillID} setDevliveryID={setDevliveryID} setAddressList={setAddressList}></PurchaseAddress>
      <PurchaseProductList productList={cartList}></PurchaseProductList>
      <PurchasePrice productList={cartList}></PurchasePrice>
      <PurchasePayment></PurchasePayment>
      <button onClick={Order}>결제하기</button>
    </div>
  );
}

export default Checkout;
