import { useCallback, useEffect, useState } from "react";
import { PurchaseBuyer, PurchaseAddress, PurchasePrice, PurchaseProductList } from "../../components"
import { getCartList_s } from "../../services/cart";
import { getAddressList_s } from "../../services/address";
import { purchaseFromCart_s } from "../../services/sale";
import { useNavigate } from "react-router-dom";

const Cookies = require("js-cookie");

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
  const [addressList, setAddressList] = useState<addressAllInfo[]>([]);
  const [billID, setBillID] = useState<string>("");
  const [devliveryID, setDevliveryID] = useState<string>("");
  const [cartList, setCartList] = useState<cartInfo[]>([]);
  const [isUseAK, setIsUseAK] = useState<boolean>(false);
  const navigate = useNavigate();
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
  const Purchase = async () =>{
    const purchaseInfo: purchaseInfoToCart = {
      addressID: devliveryID,
      billAddressID: billID,
      carts: cartList.map(cart => ({ cartID: cart.cartID })),
      isUseAK: isUseAK
    }
    await purchaseFromCart_s(purchaseInfo);
    navigate(`/mypage/orders`)
  }
  const isUser = ():boolean => {
    const isFlag = Cookies.get('access-token') 
      && Cookies.get('refresh-token') 
      && Cookies.get('first-name') 
      && Cookies.get('last-name')
      && Cookies.get('role');
    if (isFlag)
      return false;
    else 
      return true;
  }
  useEffect(() => {
    if (isUser()){
      const flag = sessionStorage.getItem("previousPage");
      if (!flag || !flag.includes("/checkout")){
        sessionStorage.setItem("previousPage", window.location.href);
      }
      navigate("/login",{replace:true});
      return;
    }
    getCartList();
    getAddressList();
  }, [getCartList, getAddressList]);
  if (isUser()){
    return(
      <div>
        <h1>로그인 먼저 해주세요.</h1>
      </div>
    )
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

export default Checkout;
