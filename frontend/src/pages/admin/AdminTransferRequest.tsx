import React, { useCallback, useEffect, useState } from 'react';
import { AdminTransferListComponent, BottomButton, SearchSet } from '../../components';
import { getTransferList_s } from '../../services/customRequest';
import { useTranslation } from 'react-i18next';

const AdminTransferRequest: React.FC = () => {
  const { t } = useTranslation();
  const [transfers, setTransfers] = useState<transfer[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminTransfer:List.Filter01"), select:'senderName', selectType:'text', itemList:[]},
    {selectName:t("AdminTransfer:List.Filter02"), select:'receiverName', selectType:'text', itemList:[]},
    {selectName:t("AdminTransfer:List.Filter03"), select:'money', selectType:'text', itemList:[]},
    {selectName:t("AdminTransfer:List.Filter04"), select:'moneyType', selectType:'text', itemList:[]},
    {selectName:t("AdminTransfer:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
    {selectName:t("AdminTransfer:List.Filter06"), select:'status', selectType:'select', itemList:[t("AdminTransfer:List.Option06.Attribute01"), t("AdminTransfer:List.Option06.Attribute02")]},
  ];

  const getTransferList = useCallback (async () => {
    try {
      const totalAndTransferList : transferList = await getTransferList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setTransfers(totalAndTransferList.list);
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
    setFilter(key);
    setFilterValue(value);
  }

  useEffect(() => {
    getTransferList(); // 비동기 함수 호출
  }, [getTransferList]);

  return (
    <div>
      <h1>{t("AdminTransfer:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminTransferListComponent transfers={transfers}  changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminTransferRequest;
