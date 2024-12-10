import React, { useCallback, useEffect, useState } from 'react';
import { AdminOrderListComponent, BottomButton, SearchSet } from '../../components';
import { getOrderList_s } from '../../services/sale';

const AdminOrderList: React.FC = () => {
  const [orders, setOrders] = useState<order[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:'상품명', select:'name', selectType:'text', itemList:[]},
    {selectName:'주문자', select:'email', selectType:'text', itemList:[]},
    {selectName:'상태', select:'phone', selectType:'select', itemList:['처리중', '배송중', '완료']},
    {selectName:'작성일', select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getOrderList = useCallback (async () => {
    try {
      const totalAndOrderList : orderList = await getOrderList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setOrders(totalAndOrderList.orders);
      setLastPage(totalAndOrderList.totalOrder === 0? 1:Math.floor((totalAndOrderList.totalOrder - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching inquiry list:', error);
    }
},[pageNo, pageSize, filter, filterValue, sort, sortValue]);

  const changePage = (move:number) =>{
      setPageNo(move);
  }
  const changeSort = (sortName:string) => {
    if (sortName === sort){
      if(sortValue ==='ASC')
        setSortValue('DESC')
      else
      setSortValue('ASC')
    } else {
      setSort(sortName);
      setSortValue('ASC');
    }
  }
  const changeFilter = (key:number, value:string) =>{
    setFilter(key);
    setFilterValue(value);
  }

  useEffect(() => {
    getOrderList(); // 비동기 함수 호출
  }, [getOrderList]);

  return (
    <div>
      <h1>AdminOrderList</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminOrderListComponent orders={orders} changeSort={changeSort}></AdminOrderListComponent>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminOrderList;
