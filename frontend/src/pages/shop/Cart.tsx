import { useCallback, useEffect, useState } from "react";
import { CartList, CartSelectMoney } from "../../components";
import { getCartList_s } from "../../services/cart";
import { useNavigate } from "react-router-dom";

const Cookies = require("js-cookie");

const Cart:React.FC = () => {
  const [cartList, setCartList] = useState<cartInfo[]>([]);
  const navigate = useNavigate();
  const getCartList = useCallback( async () => {
    try {
      const list = await getCartList_s();
      console.log(list);
      setCartList(list.list);
    } catch (error) {
      console.error('Error fetching cart list:', error);
    }
  },[]);
  const changeItemOption = (item : cartInfo) => {
    const tempcartList:cartInfo[] = [...cartList];;
    for(let i = 0 ; i < tempcartList.length; i++){
      if(tempcartList[i].productId === item.productId){
        tempcartList[i] = item;
        break;
      }
    }
    setCartList(tempcartList);
  }
  const deleteItemOption = (cartId : string) => {
    console.log(cartList);
    setCartList(cartList.filter(item => item.cartID !== cartId));
  }
  const buySelect = () => {
    //구매 페이지로 이동 정보 추가로 넣어서 보내줘야 할듯 1. product를 보낸다, 2. cart를 보낸다
    navigate(`/checkout`);

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
      if (!flag || !flag.includes("/cart")){
        sessionStorage.setItem("previousPage", window.location.href);
      }
      navigate("/login",{replace:true});
      return;
    }
    getCartList();
  }, [getCartList]);
  if (isUser()){
    return(
      <div>
        <h1>로그인 먼저 해주세요.</h1>
      </div>
    )
  }
  if(cartList.length === 0){
    return(
      <div>
        <h1>장바구니</h1>
        <h3>장바구니가 비었습니다.</h3>
      </div>
    )
  }
  return (
    <div>
      <h1>장바구니</h1>
      <CartList cartList={cartList} changeItemOption={changeItemOption} deleteItemOption={deleteItemOption}/>
      <CartSelectMoney cartList={cartList} buySelect={buySelect}/>
    </div>
  );
}

export default Cart;
