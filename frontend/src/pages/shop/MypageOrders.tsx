import { useCallback, useEffect, useState } from "react";
import { getShopOrderList_s } from "../../services/sale";
import { PageMove, SelectYear, ShopOrderList } from "../../components";

const MypageOrders:React.FC = () => {
  const [orders, setPrders] = useState<shopOrder[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const getOrderList = useCallback( async () => {
    try {
      const totalAndOrderList : shopOrderList = await getShopOrderList_s(pageNo, pageSize, year);
      setPrders(totalAndOrderList.list);
    } catch (error) {
      console.error('Error fetching shop order list:', error);
    }
  },[pageNo, pageSize, year]);
  
  const movePage = (type:string) => {
    if (type === "before" && pageNo !== 1){
      setPageNo(pageNo - 1);
    }
    if (type === "after" && orders.length !== 0){
      setPageNo(pageNo + 1);
    }
  }
  useEffect(() => {
    getOrderList(); // 비동기 함수 호출
  }, [getOrderList]);
  return (
    <div>
      <h1>주문 목록</h1>
      <SelectYear setYear={setYear} year={year}></SelectYear>
      <ShopOrderList orders={orders}></ShopOrderList>
      <PageMove movePage={movePage}></PageMove>
    </div>
  );
}

export default MypageOrders;
