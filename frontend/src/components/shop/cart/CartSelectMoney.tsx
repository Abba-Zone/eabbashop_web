import { useMemo } from "react";

interface Props{
    cartList:cartInfo[],
    buySelect():void
}
const CartSelectMoney:React.FC<Props> = ({cartList, buySelect}) => {
    const realPrice = useMemo(() => {
        let result:number = 0;
        for(let i = 0 ; i < cartList.length; i++){
            if(cartList[i].selectYN)
                result += cartList[i].quantity * cartList[i].realPrice;
        }
        return result;
    }, [cartList]);
    const totalSP = useMemo(() => {
        let result:number = 0;
        for(let i = 0 ; i < cartList.length; i++){
            if(cartList[i].selectYN)
                result += cartList[i].quantity * cartList[i].SP;
        }
        return result;
    }, [cartList]);
    const totalAK = useMemo(() => {
        let result:number = 0;
        for(let i = 0 ; i < cartList.length; i++){
            if(cartList[i].selectYN)
                result += cartList[i].quantity * cartList[i].AK;
        }
        return result;
    }, [cartList]);
    return (
        <div>
            <h2>주문예상금액</h2>
            <div><div>총 실제가격 : </div><div>$ {realPrice}</div></div>
            <div><div>총 SP : </div><div>{totalSP}SP</div></div>
            <div><div>총 AK : </div><div>{totalAK}AK</div></div>
            <button onClick={buySelect}>구매하기</button>
        </div>
    );
}
    
export default CartSelectMoney;
