import React, { useCallback, useEffect, useState } from 'react';
import { AdminRegularOrderListComponent, BottomButton, SearchSet } from '../../components';
import { getRegularOrderList_s } from '../../services/sale';
import { useTranslation } from 'react-i18next';

const AdminRegularOrderList: React.FC = () => {
  const { t } = useTranslation();
  const [regularOrders, setRegularOrders] = useState<regularOrder[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminRegularOrder:List.Filter01"), select:'productName', selectType:'text', itemList:[]},
    {selectName:t("AdminRegularOrder:List.Filter02"), select:'memberName', selectType:'text', itemList:[]},
    {selectName:t("AdminRegularOrder:List.Filter03"), select:'period', selectType:'text', itemList:[]},
    {selectName:t("AdminRegularOrder:List.Filter04"), select:'quantity', selectType:'text', itemList:[]},
    {selectName:t("AdminRegularOrder:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getRegularOrderList = useCallback (async () => {
    try {
      const totalAndRegularOrderList : regularOrderList = await getRegularOrderList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setRegularOrders(totalAndRegularOrderList.list);
      setLastPage(totalAndRegularOrderList.totalCount === 0? 1:Math.floor((totalAndRegularOrderList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching regularOrder list:', error);
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
    getRegularOrderList(); // 비동기 함수 호출
  }, [getRegularOrderList]);

  return (
    <div>
      <h1>{t("AdminRegularOrder:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminRegularOrderListComponent regularOrders={regularOrders} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminRegularOrderList;
