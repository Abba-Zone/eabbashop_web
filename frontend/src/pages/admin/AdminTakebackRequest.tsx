import React, { useCallback, useEffect, useState } from 'react';
import { AdminRefundListComponent, BottomButton, SearchSet } from '../../components';
import { getRefundList_s } from '../../services/customRequest';
import { useTranslation } from 'react-i18next';

const AdminTakebackRequest: React.FC = () => {
  const { t } = useTranslation();
  const [takebacks, setTakebacks] = useState<refund[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("DESC");
  const [sortValue, setSortValue] = useState<string>("createdDateTime");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminRefund:List.Filter01"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminRefund:List.Filter02"), select:'phone', selectType:'text', itemList:[]},
    {selectName:t("AdminRefund:List.Filter03"), select:'orderID', selectType:'text', itemList:[]},
    {selectName:t("AdminRefund:List.Filter04"), select:'createdDateTime', selectType:'date', itemList:[]},
    {selectName:t("AdminRefund:List.Filter05"), select:'status', selectType:'select', itemList:[t("AdminRefund:List.Option5.Attribute01"), t("AdminRefund:List.Option5.Attribute02")]},
  ];

  const getTakebackList = useCallback (async () => {
    try {
      const totalAndTakebackList : refundList = await getRefundList_s(pageNo, pageSize, selectList[filter].select, filterValue, sort, sortValue);
      setTakebacks(totalAndTakebackList.list);
      setLastPage(totalAndTakebackList.totalCount === 0? 1:Math.floor((totalAndTakebackList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching takeback list:', error);
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
    getTakebackList(); // 비동기 함수 호출
  }, [getTakebackList]);

  return (
    <div>
      <h1>{t("AdminRefund:List.TakebackTitle")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      {/* <AdminRefundListComponent refunds={takebacks}  changeSort={changeSort}/> */}
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminTakebackRequest;
