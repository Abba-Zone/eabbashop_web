import { useCallback, useEffect, useState } from "react";
import { PurchaseBuyer, PurchaseAddress, PurchasePayment, PurchasePrice, PurchaseProductList } from "../../components"
import { getAddressList_s } from "../../services/address";
import { purchaseDirect_s } from "../../services/sale";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail_s } from "../../services/product";

const DirectCheckout:React.FC = () => {
  const [buyer, setBuyer] = useState<memberInfo>({
    memberID : "1q2w3er4t5t",
    email : "rudgns9334",
    lastName : "정",
    firstName : "경훈",
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
  const [isUseAK, setIsUseAK] = useState<boolean>(false);
  const params = useParams<{id:string, quantity:string}>();
  const navigate = useNavigate();
  const getCartList = useCallback( async () => {
    try {
      if (!params.id)
        return;
      const detail = await getProductDetail_s(params.id);
      setCartList(changeToCartList(detail));
    } catch (error) {
      console.error('Error fetching product detail:', error);
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
  const Purchase = async () =>{
    const purchaseInfo: purchaseInfoDirect = {
      addressID: devliveryID,
      billAddressID: billID,
      products: [ {productID:params.id? params.id:"", quantity:Number(params.quantity)} ],
      isUseAK: isUseAK
    }
    await purchaseDirect_s(purchaseInfo);
    navigate(`/mypage/orders`)
  }
  useEffect(() => {
    getCartList();
    getAddressList();
  }, [getCartList, getAddressList]);
  const changeToCartList = (detailInfo : productDetail): cartInfo[] => {
    const result : cartInfo[] = [];
    console.log(detailInfo)
    result.push({
      thumbnail: detailInfo.thumbnail,
      AK: detailInfo.realPrice,
      cartID: "",
      name: detailInfo.productName,
      productId: detailInfo.productID,
      quantity: Number(params.quantity),
      realPrice: detailInfo.realPrice,
      selectYN: true,
      SP: detailInfo.spPrice,
      stock: detailInfo.stock,
    })
    return result;
  }
  return (
    <div>
      <h1>주문 / 결제</h1>
      <PurchaseBuyer buyer={buyer}></PurchaseBuyer>
      <PurchaseAddress addressList={addressList} billID={billID} devliveryID={devliveryID} setBillID={setBillID} setDevliveryID={setDevliveryID} setAddressList={setAddressList}></PurchaseAddress>
      <PurchaseProductList productList={cartList}></PurchaseProductList>
      <PurchasePrice productList={cartList}></PurchasePrice>
      <div>보유하신 AK를 사용하시겠습니까? <input type="checkbox" onChange={() => setIsUseAK(!isUseAK)}/></div>
      {/* <PurchasePayment></PurchasePayment> */}
      <button onClick={Purchase}>결제하기</button>
    </div>
  );
}

export default DirectCheckout;
