import { useMemo } from "react";
import CartListCard from "./CartListCard";

interface Props{
  cartList:cartInfo[],
  changeItemOption(item : cartInfo):void
  deleteItemOption(cartID : string):void
}

const CartList:React.FC<Props> = ({cartList, changeItemOption, deleteItemOption}) => {
  const rendering = useMemo(() => {
    const result = [];
    for(let i = 0 ; i < cartList.length; i++){
      result.push(<CartListCard key={i} Info={cartList[i]} changeItemOption={changeItemOption} deleteItemOption={deleteItemOption}></CartListCard>);
    }
    return result;
      }, [cartList]);
  return (
    <div>
        {rendering}
    </div>
  );
}
  
export default CartList;