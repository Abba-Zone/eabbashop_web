import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopOrderDetail_s } from "../../../services/sale";
import { OrderInfo } from "../../../components";

const MypageOrderDetail:React.FC = () => {
  const [orderInfo, setOrderInfo] = useState<shopOrderInfo | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getOrderDetail = useCallback (async () => {
      try {
        if (params.id !== undefined){
          const orderInfo : shopOrderInfo = await getShopOrderDetail_s(params.id);
          setOrderInfo(orderInfo);
        }
      } catch (error) {
        console.error('Error fetching orderDetail:', error);
      }
    }, [params.id]);
    useEffect(() => {
      getOrderDetail(); // 비동기 함수 호출
    }, [getOrderDetail]);
    if(!orderInfo){
      return(
        <div></div>
      )
    }
  return (
    <div>
      <h1>주문 상세</h1>
      <OrderInfo orderInfo={orderInfo}></OrderInfo>
    </div>
  );
}

export default MypageOrderDetail;
