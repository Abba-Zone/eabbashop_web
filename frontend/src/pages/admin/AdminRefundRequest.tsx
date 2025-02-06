import React, { useCallback, useEffect, useState } from 'react';
import { AdminRefundListComponent, BottomButton, SearchSet } from '../../components';
import { getRefundList_s } from '../../services/customRequest';
import { useTranslation } from 'react-i18next';

const AdminRefundRequest: React.FC = () => {
  const { t } = useTranslation();
  const [refunds, setRefunds] = useState<refund[]>([]);
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

  const getRefundList = useCallback (async () => {
    try {
      const totalAndRefundList : refundList = await getRefundList_s(pageNo - 1, pageSize, selectList[filter].select, filterValue, sort, sortValue);
      console.log(totalAndRefundList.list);
      setRefunds(totalAndRefundList.list);
      setLastPage(totalAndRefundList.totalCount === 0? 1:Math.floor((totalAndRefundList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching refund list:', error);
    }
},[pageNo, pageSize, filter, filterValue, sort, sortValue]);

  const changePage = (move:number) =>{
      setPageNo(move);
  }
  const changeSort = (sortName:string) => {
    if (sortName === sortValue){
      if(sort ==='ASC')
        setSort('DESC')
      else
      setSort('ASC')
    } else {
      setSortValue(sortName);
      setSort('ASC');
    }
    setPageNo(1);
  }
  const changeFilter = (key:number, value:string) =>{
    setFilter(key);
    setFilterValue(value);
    setPageNo(1)
  }

  useEffect(() => {
    getRefundList(); // 비동기 함수 호출
  }, [getRefundList]);

  return (
    <div>
      <h1>{t("AdminRefund:List.RefundTitle")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <select name="pageSize" value={pageSize} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setPageNo(1);setPageSize(Number(event.target.value))}}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select><span>개씩 보기</span>
      <AdminRefundListComponent refunds={refunds} setRefunds={setRefunds} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminRefundRequest;
