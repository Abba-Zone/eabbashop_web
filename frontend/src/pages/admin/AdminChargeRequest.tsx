import React, { useCallback, useEffect, useState } from 'react';
import { BottomButton, SearchSet, AdminChargeListComponent } from '../../components';
import { getPointHistoryRequestAdmin_s } from '../../services/point';
import { useTranslation } from 'react-i18next';

const AdminChargeRequest: React.FC = () => {
  const { t } = useTranslation();
  const [requests, setRequests] = useState<pointHistoryInfo[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [sortValue, setSortValue] = useState<string>('');
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminTransfer:List.Filter01"), select:'requester', selectType:'text', itemList:[]},
    {selectName:t("AdminTransfer:List.Filter02"), select:'type', selectType:'text', itemList:[]},
    {selectName:t("AdminTransfer:List.Filter03"), select:'amount', selectType:'text', itemList:[]},
    {selectName:t("AdminTransfer:List.Filter04"), select:'status', selectType:'text', itemList:[]},
    {selectName:t("AdminTransfer:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getTransferList = useCallback (async () => {
    try {
      const totalAndTransferList : pointHistory = await getPointHistoryRequestAdmin_s(pageNo-1, pageSize, filter, filterValue, sort, sortValue);
      setRequests(totalAndTransferList.list);
      setLastPage(totalAndTransferList.totalCount === 0? 1:Math.floor((totalAndTransferList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching transfer list:', error);
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
    setFilter(selectList[key].select);
    setFilterValue(value);
  }

  useEffect(() => {
    getTransferList();
  }, [getTransferList]);

  return (
    <div>
      <h1>{t("AdminTransfer:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminChargeListComponent requests={requests}  changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminChargeRequest;