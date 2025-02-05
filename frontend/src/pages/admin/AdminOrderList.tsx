import React, { useCallback, useEffect, useState } from 'react';
import { AdminOrderListComponent, BottomButton, SearchSet } from '../../components';
import { getOrderList_s } from '../../services/sale';
import { useTranslation } from 'react-i18next';

const AdminOrderList: React.FC = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<order[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("DESC");
  const [sortValue, setSortValue] = useState<string>("createdDateTime");
  const [selectIDs, setSelectIDs] = useState<{orderDetailID:string}[]>([]);
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminOrder:List.Filter01"), select:'productName', selectType:'text', itemList:[]},
    {selectName:t("AdminOrder:List.Filter02"), select:'memberName', selectType:'text', itemList:[]},
    {selectName:t("AdminOrder:List.Filter03"), select:'status', selectType:'select', itemList:[t("AdminOrder:List.Option03.Attribute01"), t("AdminOrder:List.Option03.Attribute02"), t("AdminOrder:List.Option03.Attribute03")]},
    {selectName:t("AdminOrder:List.Filter04"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getOrderList = useCallback (async () => {
    try {
      const totalAndOrderList : orderList = await getOrderList_s(pageNo - 1, pageSize, selectList[filter].select, filterValue, sort, sortValue);
      setOrders(totalAndOrderList.list);
      setLastPage(totalAndOrderList.totalCount === 0? 1:Math.floor((totalAndOrderList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching order list:', error);
    }
},[pageNo, pageSize, filter, filterValue, sort, sortValue]);

  const changePage = (move:number) =>{
      setPageNo(move);
  }
  const changeSortValue = (sortName:string) => {
    if (sortName === sortValue){
      if(sort ==='ASC')
        setSort('DESC')
      else
        setSort('ASC')
    } else {
      setSortValue(sortName);
      setSort('ASC');
    }
  }
  const changeFilter = (key:number, value:string) =>{
    setFilter(key);
    setFilterValue(value);
  }

  useEffect(() => {
    getOrderList(); // 비동기 함수 호출
  }, [getOrderList]);

  const selectID = (id:string) =>{
    for(let i = 0 ; i < selectIDs.length; i++){
      if(selectIDs[i].orderDetailID === id){
        setSelectIDs(selectIDs.filter(item=> item.orderDetailID !== id))
        return
      }
    }
    setSelectIDs([...selectIDs, {orderDetailID:id}]);
  }
  const clickInvoiceRegist = () => {
    console.log(selectIDs)
    console.log(pageSize)
  }
  return (
    <div>
      <h1>{t("AdminOrder:List.Title")}</h1>
      <button onClick={clickInvoiceRegist}>송장등록</button>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <select name="pageSize" value={pageSize} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setPageSize(Number(event.target.value))}}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select><span>개씩 보기</span>
      <AdminOrderListComponent orders={orders} changeSort={changeSortValue} selectID={selectID}></AdminOrderListComponent>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminOrderList;
