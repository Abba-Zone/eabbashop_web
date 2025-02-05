import { useState } from "react";
import { PurchaseBuyer, PurchaseAddress, PurchasePayment, PurchasePrice, PurchaseProductList } from "../../components"
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
    firstName : "정",
    lastName : "경훈",
    role : "판매점",
    recommend : "ych526@naver.com",
    phone : "010-9334-1487",
    grade : "VVVVVVVVVVVVVVS",
    createdDateTime : "2024-11-15 16:30:22",
    platform:"zone",
  });
  const [addressList, setAddressList] = useState<addressAllInfo[]>([
    {
        addressID:"1234",
        country : "KOR",
        zipCode : "11111",
        baseAddress : "부산시 기장군",
        detailAddress : "파란하집",
        isMain : true,
        isBill : true,
        host : "정경훈",
        phone : "010-1234-5678",
        name : "우리집",
        comment : "문앞에두지말고경비원옆에두지말고널판"
   },
   {
        addressID:"5678",
        country : "KOR5",
        zipCode : "111115",
        baseAddress : "부산시 기장군5",
        detailAddress : "파란하늘집5",
        isMain : false,
        isBill : false,
        host : "정경훈5",
        phone : "010-1234-56785",
        name : "우리집5",
        comment : "문앞에두지말고경비원옆에두지말고널판5"
  }
]);
  const [billID, setBillID] = useState<string>("1234");
  const [devliveryID, setDevliveryID] = useState<string>("5678");
  const [productList, setProductList] = useState<buyProduct[]>([
    {productID : "aasg564olvizxhncb31", name : `상품이름test1`, realPrice : 14, SP : 5, AW : 9, AK : 5, cnt: 1},
    {productID : "aasg564olvizxhncb32", name : `상품이름test2`, realPrice : 14, SP : 5, AW : 9, AK : 5, cnt: 1},
    {productID : "aasg564olvizxhncb33", name : `상품이름test3`, realPrice : 14, SP : 5, AW : 9, AK : 5, cnt: 1},
  ]);
  const Order = () =>{
    //주어진 정보들로 주문하기
    //페이지 이동
  }
  return (
    <div>
      <h1>주문 / 결제</h1>
      <PurchaseBuyer buyer={buyer}></PurchaseBuyer>
      <PurchaseAddress addressList={addressList} billID={billID} devliveryID={devliveryID} setBillID={setBillID} setDevliveryID={setDevliveryID}></PurchaseAddress>
      <PurchaseProductList productList={productList}></PurchaseProductList>
      <PurchasePrice productList={productList}></PurchasePrice>
      <PurchasePayment></PurchasePayment>
      <button onClick={Order}>결제하기</button>
    </div>
  );
}

export default Checkout;
